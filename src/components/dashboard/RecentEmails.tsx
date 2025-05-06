import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMailContext } from '../../context/MailContext';
import { formatDate } from '../../utils/dateUtils';
import { ChevronRight } from 'lucide-react';

const RecentEmails: React.FC = () => {
  const { emails, selectEmail } = useMailContext();
  const navigate = useNavigate();
  
  // Get the 5 most recent emails
  const recentEmails = [...emails]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  const handleEmailClick = (emailId: string) => {
    const email = emails.find(e => e.id === emailId);
    if (email) {
      selectEmail(email);
      navigate('/inbox');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium">Recent Emails</h2>
      </div>
      
      {recentEmails.length === 0 ? (
        <div className="py-6 px-4 text-center text-gray-500 dark:text-gray-400">
          <p>No recent emails to display.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentEmails.map((email) => (
            <div 
              key={email.id}
              onClick={() => handleEmailClick(email.id)}
              className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors flex justify-between items-center"
            >
              <div className="overflow-hidden">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium truncate pr-4">
                    {email.sender === 'me@example.com' ? 'To: ' + email.recipient : 'From: ' + email.sender}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                    {formatDate(email.timestamp)}
                  </span>
                </div>
                <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 truncate">
                  {email.subject}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {email.body.substring(0, 60)}
                  {email.body.length > 60 ? '...' : ''}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 ml-2 shrink-0" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentEmails;