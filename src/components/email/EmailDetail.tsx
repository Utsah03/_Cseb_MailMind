import React, { useState } from 'react';
import { ArrowLeft, Trash2, Star, Clock, Tag, Archive, Reply, Forward, Lock, CheckSquare } from 'lucide-react';
import { useMailContext } from '../../context/MailContext';
import { formatDate } from '../../utils/dateUtils';
import Button from '../common/Button';

const EmailDetail: React.FC = () => {
  const { selectedEmail, selectEmail, deleteEmail, summarizeEmail, extractTasks, setPriority } = useMailContext();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [decrypted, setDecrypted] = useState(false);

  if (!selectedEmail) return null;

  const handleBack = () => {
    selectEmail(null);
  };

  const handleDelete = () => {
    if (selectedEmail) {
      deleteEmail(selectedEmail.id);
    }
  };

  const handleSetPriority = (priority: 'high' | 'normal' | 'low') => {
    if (selectedEmail) {
      setPriority(selectedEmail.id, priority);
    }
  };

  const emailSummary = summarizeEmail(selectedEmail.id);
  const tasks = extractTasks(selectedEmail.id);

  const handleDecrypt = () => {
    if (password === selectedEmail.password) {
      setDecrypted(true);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden h-full flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={handleBack} aria-label="Back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="ml-2 text-lg font-medium">{selectedEmail.subject}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleSetPriority(selectedEmail.priority === 'high' ? 'normal' : 'high')}
            aria-label={selectedEmail.priority === 'high' ? 'Remove priority' : 'Mark as high priority'}
          >
            <Star 
              className={`h-5 w-5 ${selectedEmail.priority === 'high' ? 'text-amber-500 fill-current' : ''}`} 
            />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete} aria-label="Delete">
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between mb-3">
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {selectedEmail.sender === 'me@example.com' ? 'To: ' + selectedEmail.recipient : 'From: ' + selectedEmail.sender}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(selectedEmail.timestamp, true)}
            </p>
          </div>
          <div className="flex space-x-1">
            {selectedEmail.labels.map(label => (
              <span 
                key={label}
                className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <Button size="sm" variant="outline" onClick={() => setShowSummary(!showSummary)}>
            <Clock className="h-4 w-4 mr-1" />
            {showSummary ? 'Hide Summary' : 'Show Summary'}
          </Button>
          <Button size="sm" variant="outline" onClick={() => setShowTasks(!showTasks)}>
            <CheckSquare className="h-4 w-4 mr-1" />
            {showTasks ? 'Hide Tasks' : 'Extract Tasks'}
          </Button>
        </div>
        
        {showSummary && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-4">
            <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-1">AI Summary</h3>
            <p className="text-sm text-blue-800 dark:text-blue-300">{emailSummary}</p>
          </div>
        )}
        
        {showTasks && (
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mb-4">
            <h3 className="text-sm font-semibold text-green-700 dark:text-green-400 mb-1">Extracted Tasks</h3>
            <ul className="text-sm text-green-800 dark:text-green-300 space-y-1">
              {tasks.map((task, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        {selectedEmail.encrypted && !decrypted ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Lock className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">This email is encrypted</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-center max-w-md">
              Enter the password to view the contents of this email
            </p>
            <div className="flex gap-2">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <Button onClick={handleDecrypt}>Decrypt</Button>
            </div>
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">Show password</span>
            </label>
          </div>
        ) : (
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-line">{selectedEmail.body}</p>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Reply className="h-4 w-4 mr-1" />
            Reply
          </Button>
          <Button variant="outline" size="sm">
            <Forward className="h-4 w-4 mr-1" />
            Forward
          </Button>
        </div>
        <div>
          <Button variant="ghost" size="sm">
            <Archive className="h-4 w-4 mr-1" />
            Archive
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;