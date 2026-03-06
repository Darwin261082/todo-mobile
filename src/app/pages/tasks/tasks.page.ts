import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SqliteService } from '../../services/sqlite.service';
import { Network } from '@capacitor/network';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,],
  templateUrl: './tasks.page.html'
})
export class TasksPage implements OnInit {

  tasks: any[] = [];
  title: string = '';
  online = true;

  constructor(private api: ApiService, private sqlite: SqliteService,private auth: AuthService) {}

  async ngOnInit() {
    this.auth.token$.subscribe(token => {
  if (token) this.loadTasks();
});
  // Inicializar SQLite
  await this.sqlite.init();

  // Detectar estado de red
  const status = await Network.getStatus();
  this.online = status.connected;

  // Esperar token
  const token = localStorage.getItem('token');
  if (token) {
    await this.loadTasks();
  }

  // Escuchar cambios de red
  Network.addListener('networkStatusChange', (status: any) => {
    this.online = status.connected;
    if (this.online) this.syncTasks();
  });
}

  async loadTasks() {
  const token = localStorage.getItem('token');

  if (this.online && token) {
    this.api.tasks(token).subscribe(async (res: any) => {
      this.tasks = res;

      // Guardar localmente en SQLite
      for (const t of res) {
        await this.sqlite.updateTask(t.id, t.title, t.completed);
      }
    }, err => {
      console.error('Error cargando tareas:', err);
      this.tasks = [];
    });
  } else {
    // Offline: cargar de SQLite
    this.tasks = await this.sqlite.getTasks();
  }
}

  async createTask() {
    if (this.online) {
      const token = localStorage.getItem('token');
      await fetch('http://localhost/todo-api/public/index.php/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ title: this.title })
      });
    } else {
      await this.sqlite.addTask(this.title);
    }
    this.title = '';
    this.loadTasks();
  }

  async toggleComplete(task: any) {
    task.completed = !task.completed;

    if (this.online) {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost/todo-api/public/index.php/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ title: task.title,completed: task.completed })
      }).catch(err => {
        console.error('Error al actualizar:', err);
        task.completed = !task.completed; // revertir
      });
    } else {
      await this.sqlite.updateTask(task.id, task.title, task.completed);
    }
  }

  async saveTask(task: any) {
    if (this.online) {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost/todo-api/public/index.php/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ title: task.title, completed: task.completed })
      });
    } else {
      await this.sqlite.updateTask(task.id, task.title, task.completed);
    }
    this.loadTasks();
  }

  async deleteTask(task: any) {
    if (this.online) {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost/todo-api/public/index.php/api/tasks/${task.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });
    } else {
      await this.sqlite.deleteTask(task.id);
    }
    this.loadTasks();
  }

  async syncTasks() {
    // Cuando vuelve internet, sincronizamos tareas locales con la API
    const localTasks = await this.sqlite.getTasks();
    const token = localStorage.getItem('token');
    for (const t of localTasks) {
      await fetch('http://localhost/todo-api/public/index.php/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ title: t.title, completed: t.completed })
      });
    }
    this.loadTasks();
  }

}