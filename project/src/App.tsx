import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { TaskManager } from './components/TaskManager';
import { AIInsights } from './components/AIInsights';
import { Integrations } from './components/Integrations';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { IntegrationProvider } from './context/IntegrationContext';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Initializing AI Agent...</p>
          <p className="text-slate-300 text-sm mt-2">Connecting to your productivity tools</p>
        </div>
      </div>
    );
  }

  return (
    <IntegrationProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="flex">
          <Sidebar activeView={activeView} onViewChange={setActiveView} />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 p-6 overflow-auto">
              {activeView === 'dashboard' && <Dashboard />}
              {activeView === 'tasks' && <TaskManager />}
              {activeView === 'insights' && <AIInsights />}
              {activeView === 'integrations' && <Integrations />}
            </main>
          </div>
        </div>
      </div>
    </IntegrationProvider>
  );
}

export default App;