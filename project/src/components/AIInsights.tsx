import React, { useState } from 'react';
import { Brain, TrendingUp, Clock, Target, Zap, BarChart } from 'lucide-react';
import { useIntegration } from '../context/IntegrationContext';

export function AIInsights() {
  const { tasks, generateAISuggestions } = useIntegration();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateInsights = async () => {
    setIsGenerating(true);
    generateAISuggestions();
    // Simulate AI processing time
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const insights = [
    {
      title: 'Productivity Pattern',
      description: 'You complete 67% more tasks in the morning (9-11 AM)',
      suggestion: 'Schedule high-priority work during your peak hours',
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: 'Task Distribution',
      description: 'GitHub tasks take 40% longer than estimated',
      suggestion: 'Add 1.4x buffer time for development tasks',
      icon: BarChart,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      title: 'Deadline Management',
      description: 'You have 3 tasks due this week with high complexity',
      suggestion: 'Consider rescheduling lower priority items',
      icon: Clock,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
    {
      title: 'Focus Optimization',
      description: 'Slack interruptions peak between 2-4 PM',
      suggestion: 'Set "Do Not Disturb" during focused work blocks',
      icon: Target,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    }
  ];

  const automationSuggestions = [
    {
      title: 'Auto-assign PR reviews',
      description: 'Automatically assign code reviews based on expertise and availability',
      potential: 'Save 2-3 hours/week'
    },
    {
      title: 'Meeting prep automation',
      description: 'Generate agenda items from Slack discussions and GitHub activity',
      potential: 'Save 30 min/meeting'
    },
    {
      title: 'Smart task prioritization',
      description: 'Auto-prioritize tasks based on deadlines, dependencies, and impact',
      potential: 'Improve delivery by 25%'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Insights</h1>
          <p className="text-slate-400">Intelligent analysis of your productivity patterns</p>
        </div>
        <button
          onClick={handleGenerateInsights}
          disabled={isGenerating}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
        >
          {isGenerating ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Brain className="w-4 h-4" />
          )}
          {isGenerating ? 'Analyzing...' : 'Generate Insights'}
        </button>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div
              key={index}
              className={`${insight.bgColor} ${insight.borderColor} border backdrop-blur-sm rounded-xl p-6`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${insight.bgColor} border ${insight.borderColor}`}>
                  <Icon className={`w-6 h-6 ${insight.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">{insight.title}</h3>
                  <p className="text-slate-300 text-sm mb-3">{insight.description}</p>
                  <div className="bg-slate-700/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-3 h-3 text-yellow-400" />
                      <span className="text-yellow-400 text-xs font-medium">Suggestion</span>
                    </div>
                    <p className="text-slate-300 text-sm">{insight.suggestion}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Automation Opportunities */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Automation Opportunities
        </h2>
        <div className="space-y-4">
          {automationSuggestions.map((suggestion, index) => (
            <div key={index} className="bg-slate-700/30 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">{suggestion.title}</h3>
                <span className="text-emerald-400 text-sm font-medium">{suggestion.potential}</span>
              </div>
              <p className="text-slate-400 text-sm mb-3">{suggestion.description}</p>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                Set up automation →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Task Analysis */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Task Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-blue-400">{tasks.filter(t => t.status === 'completed').length}</span>
            </div>
            <p className="text-white font-medium">Completed</p>
            <p className="text-slate-400 text-sm">This week</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-orange-400">{tasks.filter(t => t.status === 'in-progress').length}</span>
            </div>
            <p className="text-white font-medium">In Progress</p>
            <p className="text-slate-400 text-sm">Active tasks</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-red-400">{tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length}</span>
            </div>
            <p className="text-white font-medium">High Priority</p>
            <p className="text-slate-400 text-sm">Needs attention</p>
          </div>
        </div>
      </div>
    </div>
  );
}