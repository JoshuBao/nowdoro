// src/types.ts
export interface Task {
    id: string;
    name: string;
    description: string;
    elapsedTime: number;
    isRunning: boolean;
    user_id: string;
}

export interface TaskSession {
    id: string;
    task_id: string;
    user_id: string;
    start_time: string;
    end_time: string | null;
    task?: Task;
}
