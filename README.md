# Formulary

![preview](./src/public/assets/foto_exemplo1.PNG)
![preview](./src/public/assets/foto_exemplo2.PNG)

> Context

This is a full-stack web application that allows users to register, log in, and access protected content using JWT-based authentication. The backend is built with Node.js and Express, and the frontend is a custom interface using HTML, CSS, and JavaScript.  

---

## Features

-   ✅ User registration
-   ✅ Secure login with password hashing
-   ✅ JWT authentication
-   ✅ Protected pages only acessible with valid token
-   ✅ Frontend fully integrated with backend

---

## Tech Stack
-   Backend: Node.js, Express, Prisma, JWT
-   Frontend: HTML, CSS, JavaScript
-   Database: SQLite

---

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/Rafael19722/att-formulario-cadastro.git
```

2. install dependencies:

```bash
npm install
```

3. configure .env:

```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET=yourKeySecret
```

4. Configure and execute the migrations:

```bash
npx prisma migrate dev --name init
```

5. Get in src paste:

```bash
cd src
```

6. Run the project:

```bash
node server.js
```

## Contact

rafael.profissional011@gmail.com
