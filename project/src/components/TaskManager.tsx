import React, { useState } from 'react';
import { Calendar, Filter, Plus, Search } from 'lucide-react';
import { useIntegration } from '../context/IntegrationContext';

export function TaskManager() {
  const { tasks, updateTask } = useIntegration();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'high') return matchesSearch && task.priority === 'high';
    if (filter === 'pending') return matchesSearch && task.status === 'pending';
    if (filter === 'completed') return matchesSearch && task.status === 'completed';
    
    return matchesSearch;
  });

  const handleStatusChange = (taskId: string, newStatus: 'pending' | 'in-progress' | 'completed') => {
    updateTask(taskId, { status: newStatus });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/10 border-green-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-400 bg-emerald-500/10';
      case 'in-progress': return 'text-blue-400 bg-blue-500/10';
      case 'pending': return 'text-slate-400 bg-slate-500/10';
      default: return 'text-slate-400 bg-slate-500/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Task Manager</h1>
          <p className="text-slate-400">Manage tasks from all your connected platforms</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-700/50 text-white placeholder-slate-400 pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-slate-700/50 text-white border border-slate-600 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Tasks</option>
              <option value="high">High Priority</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="text-slate-400 text-sm">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 p-6 hover:border-slate-600 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white font-semibold">{task.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </div>
                <p className="text-slate-400 mb-2">{task.description}</p>
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span>From: {task.source}</span>
                  {task.dueDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value as any)}
                className="bg-slate-700/50 text-white border border-slate-600 rounded-lg px-3 py-1 text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {task.aiSuggestion && (
              <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-purple-400 text-xs font-medium mb-1">AI Suggestion</p>
                    <p className="text-slate-300 text-sm">{task.aiSuggestion}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}