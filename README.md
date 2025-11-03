# 🧠 Prueba técnica Mindora

Aplicación tipo To Do List con stack Node.js + Express + MongoDB + Next.js.  
Se incluye backend, frontend y base de datos listos para ejecutar con Docker Compose.

---

## 🧩 Requisitos (dependencias para ejecutar el proyecto)

Se trabajó utilizando un ambiente de desarrollo con docker, por lo que se necesitan:

- 🐳 [Docker](https://www.docker.com/get-started)
- 🧰 [Docker Compose](https://docs.docker.com/compose/install/)
- 🧪 [Postman](https://www.postman.com/downloads/) para probar la API

---

## 🚀 Cómo ejecutar el proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/G2309/PT-Mindora.git
   cd PT-Mindora.git
   ```
    
    Construye e inicia los contenedores:
    ```bash
    docker compose up --build
    ```

Luego, abre tu navegador:

    🌐 Frontend: http://localhost:3000

    ⚙️ API (Backend): http://localhost:4000/todos

---

🧠 Estructura del proyecto

```
PT-Mindora/
├── backend/          # API Express + Mongoose
│   ├── src/
│   └── Dockerfile
├── frontend/         # Next.js minimalista
│   ├── pages/
│   ├── styles/
│   └── Dockerfile
├── docker-compose.yml
└── postman_collection.json
```

---

📬 API con Postman

Abre Postman. Luego importa el archivo postman_collection.json incluido en este repositorio. Asegúrate de que el backend esté corriendo (localhost:4000).

Prueba los endpoints:

| Método   | Ruta         | Descripción                  |
| -------- | ------------ | ---------------------------- |
| `GET`    | `/todos`     | Listar todas las tareas      |
| `POST`   | `/todos`     | Crear una nueva tarea        |
| `GET`    | `/todos/:id` | Obtener una tarea específica |
| `PUT`    | `/todos/:id` | Actualizar una tarea         |
| `DELETE` | `/todos/:id` | Eliminar una tarea           |

