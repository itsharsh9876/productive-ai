import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks, integrations..."
              className="bg-slate-700/50 text-white placeholder-slate-400 pl-10 pr-4 py-2 rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none w-80"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-slate-300 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">3</span>
            </div>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-white text-sm font-medium">Alex Chen</p>
              <p className="text-slate-400 text-xs">Senior Developer</p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}