from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine
import models
from routers import auth, tasks

# Create all tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Taskboard API",
    description="Task manager backend with JWT auth",
    version="1.0.0",
)

# CORS — update origins for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://*.vercel.app", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(tasks.router)


@app.get("/")
def root():
    return {"status": "ok", "message": "Taskboard API is running"}


@app.get("/health")
def health():
    return {"status": "healthy"}
