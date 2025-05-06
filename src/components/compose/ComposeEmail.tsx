import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Send, Lock, Sparkles } from 'lucide-react';
import { useMailContext } from '../../context/MailContext';
import Button from '../common/Button';

const ComposeEmail: React.FC = () => {
  const navigate = useNavigate();
  const { composeEmail, generateEmail, loading } = useMailContext();
  
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [encrypted, setEncrypted] = useState(false);
  const [password, setPassword] = useState('');
  const [showAiHelper, setShowAiHelper] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient.trim()) {
      alert('Please enter a recipient');
      return;
    }
    
    if (!subject.trim()) {
      alert('Please enter a subject');
      return;
    }
    
    if (!body.trim()) {
      alert('Please enter a message');
      return;
    }
    
    if (encrypted && !password.trim()) {
      alert('Please enter a password for the encrypted email');
      return;
    }
    
    composeEmail({
      recipient,
      subject,
      body,
      encrypted,
      password,
      priority: 'normal',
      labels: [],
    });
    
    navigate('/sent');
  };

  const handleGenerateEmail = async () => {
    if (!aiPrompt.trim()) {
      alert('Please enter a prompt for the AI');
      return;
    }
    
    const generatedEmail = await generateEmail(aiPrompt);
    setBody(generatedEmail);
    setShowAiHelper(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-medium">Compose Email</h2>
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} aria-label="Close">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              To:
            </label>
            <input
              type="email"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="recipient@example.com"
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder="Email subject"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="body" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message:
              </label>
              <Button 
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setShowAiHelper(!showAiHelper)}
              >
                <Sparkles className="h-4 w-4 mr-1" />
                AI Writer
              </Button>
            </div>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-64 resize-none"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          
          {showAiHelper && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-2">
                AI Email Generator
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-300 mb-3">
                Describe what you want to say, and our AI will generate an email for you.
              </p>
              <div className="space-y-3">
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-24 resize-none"
                  placeholder="e.g., Write a professional thank you email to a client after our meeting about their project"
                ></textarea>
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    onClick={handleGenerateEmail}
                    isLoading={loading}
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    Generate Email
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="encrypted"
              checked={encrypted}
              onChange={(e) => setEncrypted(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="encrypted" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center">
                <Lock className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                Encrypt this email with a password
              </div>
            </label>
          </div>
          
          {encrypted && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Enter password for encryption"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Share this password with the recipient so they can decrypt your email.
              </p>
            </div>
          )}
          
          <div className="flex justify-end">
            <Button type="submit">
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ComposeEmail;