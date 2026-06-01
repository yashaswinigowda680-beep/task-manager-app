# Taskboard

A full-stack task manager with Kanban board, JWT authentication, and REST API.

## Live Links

| | |
|---|---|
| **Frontend** | [Insert Vercel URL] |
| **Backend** | [Insert Render URL] |
| **API Docs** | [Insert Render URL]/docs |

Demo credentials: `test@test.com` / `test123`

---

## Features

- Register & login with JWT authentication
- Kanban board — To Do, In Progress, Done
- Inline stage change via dropdown on each card
- Inline title editing — click ✏️, type, press Enter
- Add tasks with title + description at the bottom of each column
- Delete tasks with confirmation
- Progress bar tracking completion %
- All data stored per user — no cross-user leakage
- Auto logout on token expiry
- Toast notifications for all actions
- Responsive — stacks to single column on mobile

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Frontend | React + TypeScript | Type safety, component model |
| Styling | Plain CSS with CSS variables | No build overhead, full control |
| HTTP client | Axios | Interceptors for token injection & 401 handling |
| Backend | FastAPI (Python) | Auto docs, fast to write, Pydantic validation |
| Auth | JWT via `python-jose` + bcrypt via `passlib` | Industry standard, stateless |
| Database | SQLite + SQLAlchemy ORM | Zero setup, file-based, good for demo scale |
| Frontend deploy | Vercel | Free, instant deploys, SPA routing support |
| Backend deploy | Render | Free tier, supports Python, easy env vars |

---

## Project Structure

```
taskboard/
├── backend/
│   ├── main.py           # FastAPI app, CORS, router registration
│   ├── database.py       # SQLAlchemy engine + session
│   ├── models.py         # User and Task ORM models
│   ├── schemas.py        # Pydantic request/response schemas
│   ├── auth.py           # JWT creation, bcrypt, get_current_user dep
│   ├── routers/
│   │   ├── auth.py       # POST /auth/register, /auth/login, GET /auth/me
│   │   └── tasks.py      # GET/POST /tasks, PATCH/DELETE /tasks/:id
│   ├── requirements.txt
│   └── render.yaml       # Render deployment config
│
└── frontend/
    ├── src/
    │   ├── api/index.ts        # Axios client + authApi + tasksApi
    │   ├── store/AuthContext.tsx # Global user state + login/register/logout
    │   ├── types/index.ts       # TypeScript interfaces + stage constants
    │   ├── pages/
    │   │   ├── AuthPage.tsx     # Login / register form
    │   │   └── BoardPage.tsx    # Main Kanban board
    │   ├── components/
    │   │   ├── Column.tsx       # Single board column
    │   │   ├── TaskCard.tsx     # Card with inline edit + stage dropdown
    │   │   └── AddTaskForm.tsx  # Inline add task form
    │   ├── App.tsx
    │   └── index.css
    └── vercel.json         # SPA rewrite rules
```

---

## Local Development

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
# API runs at http://localhost:8000
# Swagger docs at http://localhost:8000/docs
```

### Frontend

```bash
cd frontend
cp .env.example .env          # set VITE_API_URL=http://localhost:8000
npm install
npm run dev
# App runs at http://localhost:5173
```

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | No | Register new user, returns JWT |
| POST | `/auth/login` | No | Login, returns JWT |
| GET | `/auth/me` | Yes | Get current user |
| GET | `/tasks` | Yes | List current user's tasks |
| POST | `/tasks` | Yes | Create task |
| PATCH | `/tasks/:id` | Yes | Update title, description, or stage |
| DELETE | `/tasks/:id` | Yes | Delete task |

---

## Deployment

### Backend → Render

1. Push `backend/` to GitHub
2. Create new **Web Service** on Render → connect repo
3. Set **Root Directory** to `backend`
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Deploy

### Frontend → Vercel

1. Push `frontend/` to GitHub
2. Import project on Vercel → connect repo
3. Set **Root Directory** to `frontend`
4. Add environment variable: `VITE_API_URL` = your Render backend URL
5. Deploy

---

## Assumptions & Tradeoffs

**SQLite on Render**
Render's free tier has an ephemeral filesystem — the SQLite file resets on every deploy/restart. This is fine for a demo. In production, swap the `DATABASE_URL` to a persistent PostgreSQL connection (Render, Neon, or Supabase all offer free tiers).

**Plain CSS**
No Tailwind or CSS framework was used — all styles are hand-written in `index.css` using CSS custom properties. This keeps the bundle small and avoids build configuration overhead.

**No refresh token**
JWT tokens are set to expire in 7 days. A production app would implement refresh tokens. The axios interceptor auto-clears the token and redirects to login on 401.

**Single-file CSS**
All styles live in one `index.css`. At larger scale this would be split into per-component CSS modules.

**SECRET_KEY in source**
The JWT secret key is hardcoded in `auth.py` for simplicity. In production this must be moved to an environment variable (`os.environ.get("SECRET_KEY")`).

---

## Note on AI Tooling

This project was built with AI assistance (Claude). Per the assignment requirements, backend development is therefore included. The backend implements custom REST APIs, JWT authentication, and database integration.
