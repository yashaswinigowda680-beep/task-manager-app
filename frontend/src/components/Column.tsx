import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';
import type { Task, Stage } from '../types';
import { STAGE_LABELS } from '../types';

interface Props {
  stage: Stage;
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (id: number) => void;
  onAdd: (task: Task) => void;
}

export default function Column({ stage, tasks, onUpdate, onDelete, onAdd }: Props) {
  return (
    <div className={`column column-${stage}`}>
      <div className="col-header">
        <span className="col-title">{STAGE_LABELS[stage]}</span>
        <span className="col-count">{tasks.length}</span>
      </div>

      <div className="tasks-list">
        {tasks.length === 0 && (
          <div className="empty-col">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{opacity:0.35,marginBottom:6}}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>No tasks yet</span>
          </div>
        )}
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </div>

      <div className="col-footer">
        <AddTaskForm stage={stage} onAdd={onAdd} />
      </div>
    </div>
  );
}
