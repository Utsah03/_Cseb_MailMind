import React from 'react';
import { Inbox, Send, Mail, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { useMailContext } from '../../context/MailContext';

const DashboardStats: React.FC = () => {
  const { emails } = useMailContext();
  
  const stats = [
    {
      title: 'Unread Emails',
      value: emails.filter(e => e.folder === 'inbox' && !e.read).length,
      icon: <Inbox className="h-5 w-5 text-blue-500" />,
      color: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-700 dark:text-blue-300',
    },
    {
      title: 'High Priority',
      value: emails.filter(e => e.priority === 'high').length,
      icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
      color: 'bg-amber-100 dark:bg-amber-900/30',
      textColor: 'text-amber-700 dark:text-amber-300',
    },
    {
      title: 'Sent Today',
      value: emails.filter(e => {
        const today = new Date().toISOString().split('T')[0];
        const emailDate = new Date(e.timestamp).toISOString().split('T')[0];
        return e.folder === 'sent' && emailDate === today;
      }).length,
      icon: <Send className="h-5 w-5 text-green-500" />,
      color: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-700 dark:text-green-300',
    },
    {
      title: 'Total Emails',
      value: emails.length,
      icon: <Mail className="h-5 w-5 text-purple-500" />,
      color: 'bg-purple-100 dark:bg-purple-900/30',
      textColor: 'text-purple-700 dark:text-purple-300',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-5">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.title}
                </h3>
                <p className={`text-2xl font-semibold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;