import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskFilters from '../components/TaskFilters';
import { Plus } from 'lucide-react';

const TaskDashboard = () => {
  const [showAddTask, setShowAddTask] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl  font-semibold text-gray-900">Tasks</h2>
        <button
          onClick={() => setShowAddTask(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Task
        </button>
      </div>

      <div className="mb-6">
        <TaskFilters />
      </div>

      <TaskList />

      {showAddTask && <TaskForm onClose={() => setShowAddTask(false)} />}
    </div>
  );
};

export default TaskDashboard;
