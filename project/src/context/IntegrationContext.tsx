import React, { createContext, useContext, useState, useEffect } from 'react';

interface Integration {
  id: string;
  name: string;
  type: 'github' | 'slack' | 'notion' | 'calendar';
  connected: boolean;
  lastSync: Date | null;
  tasksCount?: number;
  icon: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  source: string;
  dueDate?: Date;
  status: 'pending' | 'in-progress' | 'completed';
  aiSuggestion?: string;
}

interface IntegrationContextType {
  integrations: Integration[];
  tasks: Task[];
  connectIntegration: (id: string) => void;
  disconnectIntegration: (id: string) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  generateAISuggestions: () => void;
}

const IntegrationContext = createContext<IntegrationContextType | undefined>(undefined);

export function IntegrationProvider({ children }: { children: React.ReactNode }) {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'github',
      name: 'GitHub',
      type: 'github',
      connected: true,
      lastSync: new Date(Date.now() - 5 * 60000),
      tasksCount: 8,
      icon: '🐙'
    },
    {
      id: 'slack',
      name: 'Slack',
      type: 'slack',
      connected: true,
      lastSync: new Date(Date.now() - 2 * 60000),
      tasksCount: 12,
      icon: '💬'
    },
    {
      id: 'notion',
      name: 'Notion',
      type: 'notion',
      connected: false,
      lastSync: null,
      tasksCount: 0,
      icon: '📝'
    },
    {
      id: 'calendar',
      name: 'Google Calendar',
      type: 'calendar',
      connected: true,
      lastSync: new Date(Date.now() - 15 * 60000),
      tasksCount: 5,
      icon: '📅'
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review PR #234: Authentication System',
      description: 'Code review needed for new authentication implementation',
      priority: 'high',
      source: 'GitHub',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      status: 'pending',
      aiSuggestion: 'This PR involves security-critical changes. Consider scheduling a team review meeting.'
    },
    {
      id: '2',
      title: 'Team Standup Follow-up',
      description: 'Address blockers discussed in morning standup',
      priority: 'medium',
      source: 'Slack',
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'Q1 Planning Meeting',
      description: 'Quarterly planning and goal setting session',
      priority: 'high',
      source: 'Google Calendar',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: 'pending',
      aiSuggestion: 'Prepare agenda items and previous quarter metrics before this meeting.'
    },
    {
      id: '4',
      title: 'Bug Fix: Mobile Navigation',
      description: 'Fix responsive navigation issues on mobile devices',
      priority: 'medium',
      source: 'GitHub',
      status: 'pending'
    },
    {
      id: '5',
      title: 'Client Demo Preparation',
      description: 'Prepare demo materials for client presentation',
      priority: 'high',
      source: 'Slack',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      status: 'pending'
    }
  ]);

  const connectIntegration = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, connected: true, lastSync: new Date() }
          : integration
      )
    );
  };

  const disconnectIntegration = (id: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, connected: false, lastSync: null }
          : integration
      )
    );
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const generateAISuggestions = () => {
    const suggestions = [
      'Consider batching similar GitHub reviews to improve focus.',
      'Schedule dedicated time blocks for deep work on high-priority tasks.',
      'Set up automated reminders for upcoming deadlines.',
      'Group related Slack discussions into focused time periods.'
    ];

    setTasks(prev => prev.map((task, index) => ({
      ...task,
      aiSuggestion: task.aiSuggestion || suggestions[index % suggestions.length]
    })));
  };

  useEffect(() => {
    // Simulate periodic sync
    const interval = setInterval(() => {
      setIntegrations(prev => 
        prev.map(integration => 
          integration.connected 
            ? { ...integration, lastSync: new Date() }
            : integration
        )
      );
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <IntegrationContext.Provider value={{
      integrations,
      tasks,
      connectIntegration,
      disconnectIntegration,
      updateTask,
      generateAISuggestions
    }}>
      {children}
    </IntegrationContext.Provider>
  );
}

export function useIntegration() {
  const context = useContext(IntegrationContext);
  if (context === undefined) {
    throw new Error('useIntegration must be used within an IntegrationProvider');
  }
  return context;
}