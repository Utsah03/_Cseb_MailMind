import React, { createContext, useContext, useState, useEffect } from 'react';
import { Email, EmailFolder, EmailPriority } from '../types/email';
import { mockEmails } from '../data/mockData';

interface MailContextProps {
  emails: Email[];
  selectedEmail: Email | null;
  loading: boolean;
  getEmailsByFolder: (folder: EmailFolder) => Email[];
  selectEmail: (email: Email | null) => void;
  composeEmail: (email: Partial<Email>) => void;
  deleteEmail: (id: string) => void;
  markAsRead: (id: string) => void;
  setPriority: (id: string, priority: EmailPriority) => void;
  summarizeEmail: (id: string) => string;
  extractTasks: (id: string) => string[];
  generateEmail: (prompt: string) => Promise<string>;
}

const MailContext = createContext<MailContextProps | undefined>(undefined);

export const useMailContext = () => {
  const context = useContext(MailContext);
  if (!context) {
    throw new Error('useMailContext must be used within a MailProvider');
  }
  return context;
};

export const MailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const savedEmails = localStorage.getItem('mailmind-emails');
    if (savedEmails) {
      setEmails(JSON.parse(savedEmails));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mailmind-emails', JSON.stringify(emails));
  }, [emails]);

  const getEmailsByFolder = (folder: EmailFolder) => {
    return emails.filter(email => email.folder === folder)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const selectEmail = (email: Email | null) => {
    setSelectedEmail(email);
    if (email && !email.read) {
      markAsRead(email.id);
    }
  };

  const composeEmail = (email: Partial<Email>) => {
    const newEmail: Email = {
      id: Date.now().toString(),
      subject: email.subject || '',
      body: email.body || '',
      sender: 'me@example.com',
      recipient: email.recipient || '',
      timestamp: new Date().toISOString(),
      read: true,
      folder: 'sent',
      encrypted: email.encrypted || false,
      password: email.password || '',
      priority: email.priority || 'normal',
      labels: email.labels || [],
    };

    setEmails(prev => [newEmail, ...prev]);
  };

  const deleteEmail = (id: string) => {
    setEmails(prev => 
      prev.map(email => 
        email.id === id 
          ? { ...email, folder: 'trash' } 
          : email
      )
    );
    if (selectedEmail?.id === id) {
      setSelectedEmail(null);
    }
  };

  const markAsRead = (id: string) => {
    setEmails(prev => 
      prev.map(email => 
        email.id === id 
          ? { ...email, read: true } 
          : email
      )
    );
  };

  const setPriority = (id: string, priority: EmailPriority) => {
    setEmails(prev => 
      prev.map(email => {
        if (email.id === id) {
          const newLabels = [...email.labels];
          if (priority === 'high' && !newLabels.includes('Important')) {
            newLabels.push('Important');
          } else if (priority !== 'high') {
            const index = newLabels.indexOf('Important');
            if (index > -1) {
              newLabels.splice(index, 1);
            }
          }
          return { ...email, priority, labels: newLabels };
        }
        return email;
      })
    );
    
    if (selectedEmail?.id === id) {
      setSelectedEmail(prev => {
        if (!prev) return null;
        const newLabels = [...prev.labels];
        if (priority === 'high' && !newLabels.includes('Important')) {
          newLabels.push('Important');
        } else if (priority !== 'high') {
          const index = newLabels.indexOf('Important');
          if (index > -1) {
            newLabels.splice(index, 1);
          }
        }
        return { ...prev, priority, labels: newLabels };
      });
    }
  };

  const summarizeEmail = (id: string): string => {
    const email = emails.find(e => e.id === id);
    if (!email) return '';
    
    const sentences = email.body.split(/[.!?]+/).filter(Boolean);
    const words = email.body.split(/\s+/);
    
    if (sentences.length <= 2 || words.length < 30) {
      return email.body;
    }
    
    const keywordPatterns = [
      /\b(important|urgent|required|deadline|please|action|key|critical|priority)\b/i,
      /\b(todo|task|action item|update|review|complete|finish)\b/i,
      /\b(meeting|discussion|call|presentation|report)\b/i
    ];
    
    const importantSentences = sentences.filter(sentence => 
      keywordPatterns.some(pattern => pattern.test(sentence))
    );
    
    const firstSentence = sentences[0].trim();
    const lastSentence = sentences[sentences.length - 1].trim();
    
    const summary = [
      firstSentence,
      ...importantSentences.slice(0, 3),
      lastSentence
    ].filter((s, i, arr) => arr.indexOf(s) === i)
    .join('. ');
    
    return summary + '.';
  };

  const extractTasks = (id: string): string[] => {
    const email = emails.find(e => e.id === id);
    if (!email) return [];
    
    const tasks: string[] = [];
    const lines = email.body.split('\n');
    
    const taskPatterns = [
      /(?:^|\n)[-*•]?\s*(.+?(?:by|before|due)\s+.+?)(?:\.|$)/i,
      /(?:^|\n)[-*•]?\s*(please\s+.+?)(?:\.|$)/i,
      /(?:^|\n)[-*•]?\s*(?:todo|task|action item):\s*(.+?)(?:\.|$)/i,
      /(?:^|\n)\d+\.\s*(.+?)(?:\.|$)/,
      /(?:^|\n)[-*•]\s*(.+?)(?:\.|$)/,
      /\b(?:need to|must|should|have to)\s+(.+?)(?:\.|$)/i,
      /\b(?:action required|action needed|please handle|please review)\s*:?\s*(.+?)(?:\.|$)/i
    ];
    
    lines.forEach(line => {
      taskPatterns.forEach(pattern => {
        const match = line.match(pattern);
        if (match && match[1]) {
          const task = match[1].trim();
          if (task && !tasks.includes(task) && !task.toLowerCase().includes('hi') && !task.toLowerCase().includes('hello')) {
            tasks.push(task);
          }
        }
      });
    });
    
    return tasks;
  };

  const generateEmail = async (prompt: string): Promise<string> => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const greeting = 'Dear recipient,\n\n';
      const content = prompt
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      const closing = '\n\nBest regards,\nYour Name';
      
      return `${greeting}${content}${closing}`;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    emails,
    selectedEmail,
    loading,
    getEmailsByFolder,
    selectEmail,
    composeEmail,
    deleteEmail,
    markAsRead,
    setPriority,
    summarizeEmail,
    extractTasks,
    generateEmail
  };

  return <MailContext.Provider value={value}>{children}</MailContext.Provider>;
};