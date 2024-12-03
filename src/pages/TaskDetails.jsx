import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format, parseISO } from 'date-fns';
import { ArrowLeft, Calendar, CheckCircle, Circle } from 'lucide-react';

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const task = useSelector((state) =>
    state.tasks.tasks.find((t) => t.id === taskId)
  );

  if (!task) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Task not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-blue-600 hover:text-blue-800"
        >
          Go back to dashboard
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-3 mb-4">
          {task.completed ? (
            <CheckCircle size={24} className="text-green-500" />
          ) : (
            <Circle size={24} className="text-gray-400" />
          )}
          <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-gray-900">
              {task.description || 'No description provided'}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
            <div className="mt-1 flex items-center text-gray-900">
              <Calendar size={16} className="mr-2" />
              {format(parseISO(task.dueDate), 'MMMM d, yyyy')}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <span
              className={`mt-1 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                task.completed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Created</h3>
            <p className="mt-1 text-gray-900">
              {format(parseISO(task.createdAt), 'MMMM d, yyyy')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
