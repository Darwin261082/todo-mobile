import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({ providedIn: 'root' })
export class SqliteService {

  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async init(): Promise<void> {
    // Creamos la conexión: ahora con 5 argumentos
    this.db = await this.sqlite.createConnection(
      'tasks_db',    // database name
      false,         // encrypted
      'no-encryption', // mode
      1,             // version
      false          // readonly
    );

    // Abrimos la DB
    await this.db.open();

    // Crear tabla si no existe
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY,
        title TEXT,
        completed BOOLEAN
      );
    `);
  }

  async getTasks(): Promise<any[]> {
    const res = await this.db.query('SELECT * FROM tasks;');
    return res.values || [];
  }

  async addTask(title: string) {
    await this.db.run(`INSERT INTO tasks (title, completed) VALUES (?, ?)`, [title, 0]);
  }

  async updateTask(id: number, title: string, completed: boolean) {
    await this.db.run(`UPDATE tasks SET title=?, completed=? WHERE id=?`, [title, completed ? 1 : 0, id]);
  }

  async deleteTask(id: number) {
    await this.db.run(`DELETE FROM tasks WHERE id=?`, [id]);
  }

}