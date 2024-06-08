'use client'

import TaskListItem from '@/components/TaskListItem';;
import { useTasks } from '@/context/TaskContext';



const TaskList: React.FC = () => {
    const { tasks } = useTasks();
    return (
        <div className="w-full grid grid-cols-3 grid-flow-row gap-4">
            {tasks.map(task => (
                <TaskListItem key={task.id} task={task} />
            ))}
        </div>
    )
};
export default TaskList;
