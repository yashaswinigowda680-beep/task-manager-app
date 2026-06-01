# Task Manager App

## Overview
A simple Task Manager application where users can register, login, and manage tasks across three stages:

- Todo
- In Progress
- Done

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication

### Task Management
- Create Tasks
- Edit Tasks
- Delete Tasks
- Change Task Status

### UI
- Responsive Design
- Loading States
- Error Handling

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- CSS

### Backend
- FastAPI
- SQLAlchemy
- SQLite

## Assumptions
- Each user manages only their own tasks.
- SQLite is sufficient for this assignment.
- Tasks have title, description, and stage.

## Tradeoffs
- SQLite used instead of PostgreSQL for simplicity.
- Drag-and-drop functionality was not implemented.
- Simple UI prioritized over advanced animations.

## Technical Decisions
- FastAPI chosen for lightweight backend APIs.
- JWT authentication used for secure login.
- React Context API used for authentication state management.
- Three-column board structure used for task stages.

## Frontend Deployment
https://task-manager-app-mu-tan.vercel.app

## Backend Deployment
https://task-manager-app-1-fqm8.onrender.com

## Future Improvements
- Drag and Drop Tasks
- Task Due Dates
- Task Priorities
- PostgreSQL Database
- User Profile Management
