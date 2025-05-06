import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Inbox, Send, FileText, Trash, PenSquare, LayoutDashboard, Tag } from 'lucide-react';
import { useMailContext } from '../../context/MailContext';
import Button from '../common/Button';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getEmailsByFolder } = useMailContext();

  const unreadInbox = getEmailsByFolder('inbox').filter(email => !email.read).length;

  const navItems = [
    { 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      path: '/',
      badge: null
    },
    { 
      label: 'Inbox', 
      icon: <Inbox className="h-5 w-5" />, 
      path: '/inbox',
      badge: unreadInbox > 0 ? unreadInbox : null
    },
    { 
      label: 'Sent', 
      icon: <Send className="h-5 w-5" />, 
      path: '/sent',
      badge: null
    },
    { 
      label: 'Drafts', 
      icon: <FileText className="h-5 w-5" />, 
      path: '/drafts',
      badge: null
    },
    { 
      label: 'Trash', 
      icon: <Trash className="h-5 w-5" />, 
      path: '/trash',
      badge: null
    },
  ];

  const labels = [
    { name: 'Work', color: 'bg-blue-500' },
    { name: 'Personal', color: 'bg-green-500' },
    { name: 'Important', color: 'bg-red-500' },
  ];

  return (
    <aside className="w-64 border-r border-gray-200 dark:border-gray-700 hidden md:block shrink-0 h-[calc(100vh-64px)] overflow-y-auto bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="p-4">
        <Button 
          onClick={() => navigate('/compose')} 
          className="w-full justify-center"
        >
          <PenSquare className="h-5 w-5 mr-2" />
          <span>Compose</span>
        </Button>
        
        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center w-full px-3 py-2 text-left rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        
        <div className="mt-8">
          <div className="flex items-center mb-2">
            <Tag className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Labels</h3>
          </div>
          <div className="space-y-1">
            {labels.map((label) => (
              <div 
                key={label.name} 
                className="flex items-center px-3 py-2 text-sm rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <div className={`w-3 h-3 rounded-full ${label.color} mr-3`}></div>
                <span>{label.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;