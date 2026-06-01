export type Stage = 'todo' | 'inprogress' | 'done';

export const STAGES: Stage[] = ['todo', 'inprogress', 'done'];

export const STAGE_LABELS: Record<Stage, string> = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
};

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  stage: Stage;
  user_id: number;
  created_at: string;
  updated_at: string | null;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}
