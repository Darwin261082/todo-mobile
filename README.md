ToDo Mobile (Ionic + Angular + SQLite)

Aplicación móvil de gestión de tareas construida con Ionic 6 + Angular 16 que se sincroniza con el backend (todo-api) y funciona offline usando SQLite.

Creación, edición, borrado y marcar tareas como completadas.

Sincronización automática con el backend cuando vuelve internet.

Almacenamiento offline de tareas con SQLite usando Capacitor.

📦 Tecnologías utilizadas

Ionic (Angular, Capacitor)

Angular 16 (Standalone Components)

SQLite (@capacitor-community/sqlite)

Capacitor Network para detectar conexión a internet

API REST PHP (todo-api) con JWT para autenticación

HTML + Ionic Components + FormsModule

⚡ Requisitos previos

Node.js ≥ 18 (preferible 20+ para Ionic/Angular 16)

npm

Ionic CLI (npm install -g @ionic/cli)

Backend corriendo (todo-api) en http://localhost/todo-api/public/index.php

Android Studio / Xcode si quieres compilar para dispositivos

🚀 Instalación

Clonar el repositorio:

git clone https://github.com/Darwin261082/todo-mobile.git
cd todo-mobile

Instalar dependencias:

npm install

Inicializar Capacitor (solo si quieres compilar en Android/iOS):

npx cap add android
npx cap add ios

Levantar la app en desarrollo con live reload:

ionic serve
🏃 Uso

Abrir la app en el navegador (localhost) o en un emulador.

Registrar un usuario desde el formulario de Login / Registro.

Crear nuevas tareas en la sección Gestión de Tareas.

Editar título, marcar como completada/desmarcar o eliminar tareas.

Trabaja offline: si no hay internet, todas las operaciones se guardan localmente en SQLite.

Cuando vuelve la conexión, la app sincroniza automáticamente las tareas con el backend.

⚙️ Estructura del proyecto
todo-mobile/
├─ src/app/pages/login/       # Página de login y registro
├─ src/app/pages/tasks/       # Página de gestión de tareas
├─ src/app/services/          # Servicios: ApiService, SqliteService, AuthService
├─ capacitor.config.ts        # Configuración de Capacitor
├─ package.json               # Dependencias y scripts
📝 Notas importantes

Backend: Asegúrate de que todo-api esté corriendo y accesible desde la app.

Token JWT: Se almacena en localStorage y se usa para todas las peticiones.

Offline: SQLite guarda todas las tareas localmente y sincroniza cuando vuelve internet.

Capacitor Network: Detecta cambios en la conectividad y llama a syncTasks().
