import React, { useState } from 'react';
import { Star, Clock, ChevronDown } from 'lucide-react';
import { useMailContext } from '../../context/MailContext';
import { Email, EmailFolder, EmailPriority } from '../../types/email';
import { formatDate } from '../../utils/dateUtils';

interface EmailListProps {
  folder: EmailFolder;
}

const EmailList: React.FC<EmailListProps> = ({ folder }) => {
  const { getEmailsByFolder, selectEmail, markAsRead } = useMailContext();
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');
  
  const emails = getEmailsByFolder(folder);

  // Sort emails based on sort criteria
  const sortedEmails = [...emails].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else {
      const priorityOrder: Record<EmailPriority, number> = { high: 0, normal: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
  });

  const handleClick = (email: Email) => {
    selectEmail(email);
    if (!email.read) {
      markAsRead(email.id);
    }
  };

  if (emails.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 p-8">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-medium mb-2">No emails in {folder}</h3>
        <p>When you receive emails, they'll appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-medium capitalize">{folder}</h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setSortBy('date')} 
            className={`p-1.5 rounded-md transition-colors ${
              sortBy === 'date' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Clock className="h-4 w-4" />
          </button>
          <button 
            onClick={() => setSortBy('priority')} 
            className={`p-1.5 rounded-md transition-colors ${
              sortBy === 'priority' 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Star className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {sortedEmails.map((email) => (
          <div 
            key={email.id}
            onClick={() => handleClick(email)} 
            className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${
              !email.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <div className="flex items-center">
                {email.priority === 'high' && (
                  <Star className="h-4 w-4 text-amber-500 mr-2 fill-current" />
                )}
                <span className={`text-sm font-medium ${!email.read ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                  {email.sender === 'me@example.com' ? email.recipient : email.sender}
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(email.timestamp)}
              </span>
            </div>
            <div className="mb-1">
              <h3 className={`text-base ${!email.read ? 'font-semibold text-black dark:text-white' : 'font-medium text-gray-700 dark:text-gray-300'}`}>
                {email.subject}
              </h3>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate pr-4">
                {email.body.substring(0, 60)}
                {email.body.length > 60 ? '...' : ''}
              </p>
              <div className="flex space-x-1">
                {email.encrypted && (
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs px-2 py-0.5 rounded-full">
                    Encrypted
                  </span>
                )}
                {email.labels.map(label => (
                  <span 
                    key={label}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailList;