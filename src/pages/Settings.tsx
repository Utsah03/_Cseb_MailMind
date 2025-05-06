import React from 'react';
import { Moon, Sun, Bell, Shield, User, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/common/Button';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium">Settings</h2>
        </div>
        
        <div className="p-6 space-y-8">
          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
              Account Settings
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">me@example.com</p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
              Display Settings
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={toggleTheme}>
                    {theme === 'light' ? (
                      <Moon className="h-4 w-4 mr-2" />
                    ) : (
                      <Sun className="h-4 w-4 mr-2" />
                    )}
                    {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Display Density</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Comfortable</p>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
              Notification Settings
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when new emails arrive</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Desktop Notifications</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Show desktop alerts for new emails</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
              Privacy & Security
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Default Email Encryption</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Automatically encrypt outgoing emails</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;