import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskCompletion, editTask } from '../store/taskSlice';
import { format, parseISO } from 'date-fns';
import { Trash2, Edit, Check, X, Calendar, CheckCircle, Circle } from 'lucide-react';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  const handleSave = () => {
    if (editedTitle.trim()) {
      dispatch(
        editTask({
          ...task,
          title: editedTitle,
          description: editedDescription,
          dueDate: editedDueDate,
        })
      );
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="space-y-3">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Task title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Task description"
            rows={2}
          />
          <input
            type="date"
            value={editedDueDate}
            onChange={(e) => setEditedDueDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 text-gray-600 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <button
              onClick={handleSave}
              className="p-2 text-green-600 hover:text-green-800"
            >
              <Check size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button
            onClick={() => dispatch(toggleTaskCompletion(task.id))}
            className={`mt-1 ${task.completed ? 'text-green-500' : 'text-gray-400'}`}
          >
            {task.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
          </button>
          <div>
            <h3
              className={`font-medium ${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}
            >
              {task.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{task.description}</p>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Calendar size={14} className="mr-1" />
              {format(parseISO(task.dueDate), 'MMM d, yyyy')}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-blue-600 hover:text-blue-800"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:text-red-800"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
