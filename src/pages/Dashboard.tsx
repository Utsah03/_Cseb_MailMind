import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PenSquare, BarChart3, Sparkles } from 'lucide-react';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentEmails from '../components/dashboard/RecentEmails';
import Button from '../components/common/Button';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
        <Button onClick={() => navigate('/compose')}>
          <PenSquare className="h-5 w-5 mr-2" />
          Compose
        </Button>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentEmails />
        </div>
        
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden h-full">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium">AI Features</h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <h3 className="text-blue-700 dark:text-blue-300 font-medium">Email Generator</h3>
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-300 mb-3">
                  Let AI help you write professional emails quickly.
                </p>
                <Button 
                  size="sm" 
                  onClick={() => navigate('/compose')}
                  className="w-full justify-center"
                >
                  Try Email Generator
                </Button>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                  <h3 className="text-purple-700 dark:text-purple-300 font-medium">Email Analytics</h3>
                </div>
                <p className="text-sm text-purple-600 dark:text-purple-300 mb-3">
                  View insights and statistics about your email habits.
                </p>
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => {}}
                  className="w-full justify-center"
                >
                  View Analytics
                </Button>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  MailMind uses artificial intelligence to help you manage emails more efficiently, prioritize important communications, and reduce your workload.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;