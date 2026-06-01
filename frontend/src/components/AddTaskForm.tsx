import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { tasksApi } from '../api';
import type { Task, Stage } from '../types';
import toast from 'react-hot-toast';

interface Props {
  stage: Stage;
  onAdd: (task: Task) => void;
}

export default function AddTaskForm({ stage, onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const reset = () => { setTitle(''); setDesc(''); setOpen(false); };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      const task = await tasksApi.create(title.trim(), desc.trim(), stage);
      onAdd(task);
      toast.success('Task added');
      reset();
    } catch {
      toast.error('Failed to add task');
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button className="add-task-btn" onClick={() => setOpen(true)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Add task
      </button>
    );
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Task title..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => e.key === 'Escape' && reset()}
        maxLength={120}
        required
      />
      <textarea
        placeholder="Description (optional)..."
        value={desc}
        onChange={e => setDesc(e.target.value)}
        rows={6}
      />
      <div className="add-form-row">
        <button type="submit" className="btn-save" disabled={loading || !title.trim()}>
          {loading ? 'Adding…' : 'Add task'}
        </button>
        <button type="button" className="btn-cancel" onClick={reset}>
          Cancel
        </button>
      </div>
    </form>
  );
}
