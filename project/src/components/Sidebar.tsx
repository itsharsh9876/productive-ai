import React from 'react';
import { BarChart3, CheckSquare, Lightbulb, Settings, Zap } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'insights', label: 'AI Insights', icon: Lightbulb },
    { id: 'integrations', label: 'Integrations', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">ProductiveAI</h1>
            <p className="text-slate-400 text-xs">Your AI Assistant</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 text-sm font-medium">AI Active</span>
          </div>
          <p className="text-slate-400 text-xs">Monitoring your productivity tools for optimization opportunities.</p>
        </div>
      </div>
    </div>
  );
}