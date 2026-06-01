# 📋 Task Manager App

> A full-stack task management application that allows users to register, log in, and manage tasks across Todo, In Progress, and Done stages.

🔗 **Frontend Live Demo:** https://task-manager-app-mu-tan.vercel.app  
🛠️ **Backend API:** https://task-manager-app-1-fqm8.onrender.com

---

## ✨ Features

- **Authentication** — Register, log in, and stay signed in with JWT tokens
- **Kanban Board** — Organize tasks across *Todo*, *In Progress*, and *Done*
- **Full CRUD** — Create, edit, delete, and move tasks between stages
- **Responsive Design** — Works on desktop and mobile
- **Error Handling** — Inline feedback for failed requests and loading states

---

## 🖼️ Screenshot

 <img width="809" height="914" alt="image" src="https://github.com/user-attachments/assets/779fab55-96a8-4528-9df8-5dc8f82a4fa3" />

 <img width="900" height="346" alt="image" src="https://github.com/user-attachments/assets/578f32b5-7755-44a5-958b-dde4dadac8c1" />

 <img width="900" height="303" alt="image" src="https://github.com/user-attachments/assets/583e2f0d-455a-4f86-8e7c-5288e5cbef70" />



 
 

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, CSS |
| Backend | FastAPI, SQLAlchemy |
| Database | SQLite |
| Authentication | JWT (JSON Web Tokens) |
| Deployment | Vercel (frontend), Render (backend) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- pip

### 1. Clone the repo

```bash
git clone https://github.com/yashaswinigowda680-beep/task-manager-app.git
cd task-manager-app
```

### 2. Backend setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

- API: `http://localhost:8000`
- Docs: `http://localhost:8000/docs`

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

- App: `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Log in and receive a JWT |
| GET | `/tasks` | Get all tasks for current user |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/{id}` | Update a task |
| DELETE | `/tasks/{id}` | Delete a task |

---

## 📂 Project Structure

```
task-manager-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── types/
│   │   └── api/
│   └── public/
└── backend/
    ├── routers/
    ├── main.py
    ├── database.py
    ├── models.py
    ├── schemas.py
    ├── auth.py
    └── requirements.txt
```

---

## ⚖️ Tradeoffs

| Decision | Reason |
|---|---|
| SQLite over PostgreSQL | Faster setup and simpler deployment |
| JWT stored on client side | Simpler implementation for assignment scope |
| No drag-and-drop | Prioritized core functionality within timeline |
| Simple CSS styling | Focused on usability and responsiveness |

---

## 🏗️ Technical Decisions

- **FastAPI** — Lightweight, high-performance backend with auto-generated API docs
- **React + TypeScript** — Better maintainability and type safety on the frontend
- **React Context API** — Simple auth state management without Redux overhead
- **SQLAlchemy ORM** — Clean database operations with easy migration path to PostgreSQL
- **JWT Authentication** — Secure, stateless user sessions

---

## 🔮 Future Improvements

- [ ] Drag and drop tasks between stages
- [ ] Task priorities and due dates
- [ ] PostgreSQL integration
- [ ] Dark mode
- [ ] User profile management
- [ ] Email notifications

---

## 📄 License

This project was created as part of an inte
