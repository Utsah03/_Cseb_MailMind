export type EmailFolder = 'inbox' | 'sent' | 'drafts' | 'trash';
export type EmailPriority = 'high' | 'normal' | 'low';

export interface Email {
  id: string;
  subject: string;
  body: string;
  sender: string;
  recipient: string;
  timestamp: string;
  read: boolean;
  folder: EmailFolder;
  encrypted: boolean;
  password: string;
  priority: EmailPriority;
  labels: string[];
}