import { useEffect, useState } from 'react';
import { tasksApi } from '../api';
import { useAuth } from '../store/AuthContext';
import Column from '../components/Column';
import { STAGES } from '../types';
import type { Task } from '../types';
import toast from 'react-hot-toast';

export default function BoardPage() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tasksApi.list()
      .then(setTasks)
      .catch(() => toast.error('Failed to load tasks'))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdate = (updated: Task) =>
    setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));

  const handleDelete = (id: number) =>
    setTasks(prev => prev.filter(t => t.id !== id));

  const handleAdd = (task: Task) =>
    setTasks(prev => [...prev, task]);

  const initials = user?.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) ?? '??';
  const total = tasks.length;
  const done = tasks.filter(t => t.stage === 'done').length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">Taskboard</h1>

        <div className="header-right">
          <div className="stats-bar">
            <span className="stat">{total} tasks</span>
            <span className="stat-divider" />
            <span className="stat">{done} done</span>
            {total > 0 && (
              <>
                <span className="stat-divider" />
                <div className="progress-wrap">
                  <div className="progress-bar" style={{ width: `${pct}%` }} />
                </div>
                <span className="stat">{pct}%</span>
              </>
            )}
          </div>

          <div className="user-pill">
            <div className="avatar">{initials}</div>
            <span>{user?.name}</span>
          </div>

          <button className="logout-btn" onClick={() => { logout(); toast('Signed out'); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign out
          </button>
        </div>
      </header>

      {loading ? (
        <div className="loading">Loading tasks…</div>
      ) : (
        <main className="board-wrap">
          <div className="board">
            {STAGES.map(stage => (
              <Column
                key={stage}
                stage={stage}
                tasks={tasks.filter(t => t.stage === stage)}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onAdd={handleAdd}
              />
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
