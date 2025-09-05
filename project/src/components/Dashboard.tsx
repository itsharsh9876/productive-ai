import React from 'react';
import { TrendingUp, Clock, CheckCircle, AlertTriangle, Activity } from 'lucide-react';
import { useIntegration } from '../context/IntegrationContext';

export function Dashboard() {
  const { integrations, tasks } = useIntegration();

  const connectedIntegrations = integrations.filter(i => i.connected);
  const highPriorityTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const overdueTasks = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed');

  const stats = [
    {
      label: 'Connected Services',
      value: connectedIntegrations.length,
      total: integrations.length,
      icon: Activity,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      label: 'High Priority Tasks',
      value: highPriorityTasks.length,
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    },
    {
      label: 'Completed Today',
      value: completedTasks.length,
      icon: CheckCircle,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    },
    {
      label: 'Overdue Items',
      value: overdueTasks.length,
      icon: Clock,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">Your productivity insights at a glance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${stat.bgColor} ${stat.borderColor} border backdrop-blur-sm rounded-xl p-6 hover:scale-105 transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-6 h-6 ${stat.color}`} />
                <TrendingUp className="w-4 h-4 text-slate-400" />
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-white">
                  {stat.value}{stat.total && `/${stat.total}`}
                </p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {integrations.filter(i => i.connected).map((integration) => (
              <div key={integration.id} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg">
                <span className="text-2xl">{integration.icon}</span>
                <div className="flex-1">
                  <p className="text-white font-medium">{integration.name}</p>
                  <p className="text-slate-400 text-sm">
                    Last sync: {integration.lastSync ? 
                      new Date(integration.lastSync).toLocaleTimeString() : 
                      'Never'
                    }
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-blue-400 font-semibold">{integration.tasksCount}</p>
                  <p className="text-slate-400 text-xs">tasks</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Upcoming Deadlines</h2>
          <div className="space-y-4">
            {tasks
              .filter(t => t.dueDate && t.status !== 'completed')
              .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
              .slice(0, 4)
              .map((task) => {
                const isOverdue = new Date(task.dueDate!) < new Date();
                const daysUntilDue = Math.ceil((new Date(task.dueDate!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={task.id} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      task.priority === 'high' ? 'bg-red-400' :
                      task.priority === 'medium' ? 'bg-yellow-400' :
                      'bg-green-400'
                    }`} />
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{task.title}</p>
                      <p className="text-slate-400 text-xs">{task.source}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs font-medium ${isOverdue ? 'text-red-400' : 'text-slate-300'}`}>
                        {isOverdue ? 'Overdue' : `${daysUntilDue}d`}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}