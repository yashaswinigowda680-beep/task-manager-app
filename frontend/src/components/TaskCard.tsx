import { useState, useRef, useEffect } from 'react';
import { tasksApi } from '../api';
import { STAGE_LABELS, STAGES } from '../types';
import type { Task, Stage } from '../types';
import toast from 'react-hot-toast';

interface Props {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskCard({ task, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const startEdit = () => {
  setEditTitle(task.title);
  setEditDescription(task.description || '');
  setEditing(true);
};

  const saveEdit = async () => {
  if (!editTitle.trim()) return;

  setSaving(true);

  try {
    const updated = await tasksApi.update(task.id, {
  title: editTitle,
  description: editDescription,
});

    onUpdate(updated);
    toast.success('Task updated');
    setEditing(false);
  } catch {
    toast.error('Failed to update task');
  } finally {
    setSaving(false);
  }
};

  const discardEdit = () => {
    setEditTitle(task.title);
    setEditing(false);
  };

  const handleStageChange = async (stage: Stage) => {
    try {
      const updated = await tasksApi.update(task.id, { stage });
      onUpdate(updated);
    } catch {
      toast.error('Failed to move task');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this task?')) return;
    try {
      await tasksApi.delete(task.id);
      onDelete(task.id);
      toast.success('Task deleted');
    } catch {
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className="task-card">
      <div className="task-top">
       {editing ? (
  <div className="edit-form">
  <input
    className="task-title-input"
    value={editTitle}
    onChange={(e) => setEditTitle(e.target.value)}
    placeholder="Task title..."
  />

  <textarea
    className="task-desc-edit"
    value={editDescription}
    onChange={(e) => setEditDescription(e.target.value)}
    placeholder="Description (optional)..."
    rows={5}
  />

  <div className="add-form-row">
    <button
      type="button"
      className="btn-save"
      onClick={saveEdit}
    >
      Save
    </button>

    <button
      type="button"
      className="btn-cancel"
      onClick={discardEdit}
    >
      Cancel
    </button>
  </div>
</div>
) : (
  <span className="task-title">{task.title}</span>
)}

        <div className="task-actions">
          {editing ? (
            <>
              <button className="icon-btn" onClick={saveEdit} title="Save" disabled={saving}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </button>
              <button className="icon-btn" onClick={discardEdit} title="Discard">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </>
          ) : (
            <>
              <button className="icon-btn" onClick={startEdit} title="Edit">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button className="icon-btn icon-btn--danger" onClick={handleDelete} title="Delete">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
              </button>
            </>
          )}
        </div>
      </div>

      {task.description && (
        <p className="task-desc">{task.description}</p>
      )}

      <select
        className="stage-select"
        value={task.stage}
        onChange={e => handleStageChange(e.target.value as Stage)}
      >
        {STAGES.map(s => (
          <option key={s} value={s}>{STAGE_LABELS[s]}</option>
        ))}
      </select>
    </div>
  );
}
