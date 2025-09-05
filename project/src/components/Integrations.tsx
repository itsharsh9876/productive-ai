import React, { useState } from 'react';
import { Plus, Settings, CheckCircle, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { useIntegration } from '../context/IntegrationContext';

export function Integrations() {
  const { integrations, connectIntegration, disconnectIntegration } = useIntegration();
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const handleConnect = async (id: string) => {
    setIsConnecting(id);
    // Simulate authentication process
    await new Promise(resolve => setTimeout(resolve, 2000));
    connectIntegration(id);
    setIsConnecting(null);
  };

  const handleDisconnect = (id: string) => {
    disconnectIntegration(id);
  };

  const availableIntegrations = [
    {
      id: 'jira',
      name: 'Jira',
      type: 'project-management',
      icon: '🎯',
      description: 'Connect your Jira projects for enhanced task management',
      connected: false
    },
    {
      id: 'trello',
      name: 'Trello',
      type: 'kanban',
      icon: '📋',
      description: 'Sync your Trello boards with your productivity workflow',
      connected: false
    },
    {
      id: 'asana',
      name: 'Asana',
      type: 'project-management',
      icon: '✅',
      description: 'Import tasks and projects from Asana',
      connected: false
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Integrations</h1>
        <p className="text-slate-400">Connect your productivity tools for seamless workflow automation</p>
      </div>

      {/* Connected Integrations */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Wifi className="w-5 h-5 text-emerald-400" />
          Connected Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.filter(i => i.connected).map((integration) => (
            <div key={integration.id} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{integration.icon}</span>
                  <div>
                    <h3 className="text-white font-medium">{integration.name}</h3>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 text-xs">Connected</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDisconnect(integration.id)}
                  className="text-slate-400 hover:text-red-400 transition-colors"
                >
                  <WifiOff className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tasks synced:</span>
                  <span className="text-blue-400 font-medium">{integration.tasksCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last sync:</span>
                  <span className="text-slate-300">
                    {integration.lastSync ? 
                      new Date(integration.lastSync).toLocaleTimeString() : 
                      'Never'
                    }
                  </span>
                </div>
              </div>

              <button className="w-full mt-4 bg-slate-600 hover:bg-slate-500 text-white py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                <Settings className="w-4 h-4" />
                Configure
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Disconnected Integrations */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <WifiOff className="w-5 h-5 text-slate-400" />
          Available Integrations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.filter(i => !i.connected).map((integration) => (
            <div key={integration.id} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{integration.icon}</span>
                <div>
                  <h3 className="text-white font-medium">{integration.name}</h3>
                  <div className="flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-slate-400" />
                    <span className="text-slate-400 text-xs">Not connected</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-4">
                Connect {integration.name} to sync your {integration.type === 'github' ? 'repositories' : 
                                                        integration.type === 'slack' ? 'channels' :
                                                        integration.type === 'notion' ? 'databases' :
                                                        'calendar events'}
              </p>

              <button
                onClick={() => handleConnect(integration.id)}
                disabled={isConnecting === integration.id}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                {isConnecting === integration.id ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {isConnecting === integration.id ? 'Connecting...' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Integration */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-blue-400" />
          More Integrations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableIntegrations.map((integration) => (
            <div key={integration.id} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{integration.icon}</span>
                <div>
                  <h3 className="text-white font-medium">{integration.name}</h3>
                  <span className="text-slate-400 text-xs capitalize">{integration.type.replace('-', ' ')}</span>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-4">{integration.description}</p>

              <button className="w-full bg-slate-600 hover:bg-slate-500 text-white py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Coming Soon
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <CheckCircle className="w-6 h-6 text-emerald-400 mt-1" />
          <div>
            <h3 className="text-white font-semibold mb-2">Secure Authentication</h3>
            <p className="text-slate-300 text-sm mb-3">
              All integrations use OAuth 2.0 secure authentication through Descope. Your credentials are never stored or exposed.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>🔒 End-to-end encryption</span>
              <span>🛡️ SOC 2 compliant</span>
              <span>⚡ Real-time sync</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}