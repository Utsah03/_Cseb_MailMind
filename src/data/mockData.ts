import { Email } from '../types/email';

export const mockEmails: Email[] = [
  {
    id: '1',
    subject: 'Project Deliverables Update',
    body: `Hi Team,

Here are the key action items from our meeting:

1. Complete the frontend design by Friday
2. Review API documentation before next sprint
3. Schedule user testing sessions
4. Update project timeline document
5. Send progress report to stakeholders

Please ensure all tasks are completed by their respective deadlines.

Important: The client presentation is scheduled for next week.

Best regards,
Sarah`,
    sender: 'sarah@example.com',
    recipient: 'me@example.com',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    folder: 'inbox',
    encrypted: false,
    password: '',
    priority: 'high',
    labels: ['Work', 'Important'],
  },
  {
    id: '2',
    subject: 'Quarterly Review Meeting',
    body: `Dear team,

This is a reminder about our quarterly review meeting tomorrow at 10 AM.

Action Items:
• Prepare your department updates
• Bring Q3 performance metrics
• Review budget proposals
• Update team objectives

Please come prepared with all necessary documentation.

Best regards,
John`,
    sender: 'john@example.com',
    recipient: 'me@example.com',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: true,
    folder: 'inbox',
    encrypted: false,
    password: '',
    priority: 'high',
    labels: ['Work'],
  },
  {
    id: '3',
    subject: 'Vacation Plans',
    body: `Hey!

Just wanted to share my vacation plans for next month. I'll be out of office from the 15th to the 22nd.

Tasks before I leave:
- Hand over ongoing projects
- Update documentation
- Set up auto-responder
- Brief the team on pending items

Let me know if you need anything from me before I go.

Cheers,
Alex`,
    sender: 'alex@example.com',
    recipient: 'me@example.com',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    folder: 'inbox',
    encrypted: false,
    password: '',
    priority: 'normal',
    labels: ['Personal'],
  },
  {
    id: '4',
    subject: 'Re: Project Timeline',
    body: `Thanks for the update. I've reviewed the timeline and have a few concerns:

1. The testing phase seems too short
2. We need more buffer time for client feedback
3. Resource allocation might be tight in Q4

Can we schedule a call to discuss these points?

Regards,
Michael`,
    sender: 'michael@example.com',
    recipient: 'me@example.com',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    read: false,
    folder: 'inbox',
    encrypted: false,
    password: '',
    priority: 'high',
    labels: ['Work', 'Important'],
  },
  {
    id: '5',
    subject: 'Team Building Event',
    body: `Hello everyone!

I'm excited to announce our upcoming team building event!

Details:
- Date: Next Friday
- Location: Central Park
- Time: 2 PM - 6 PM
- Activities: Outdoor games, team challenges, and BBQ

Please RSVP by Wednesday.

Best,
HR Team`,
    sender: 'hr@example.com',
    recipient: 'me@example.com',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    folder: 'inbox',
    encrypted: false,
    password: '',
    priority: 'normal',
    labels: ['Work'],
  },
  {
    id: '6',
    subject: 'Confidential: Q4 Strategy',
    body: `This email contains confidential information about our Q4 strategy.

Key Points:
1. Market expansion plans
2. New product launches
3. Budget allocations
4. Team restructuring

Please keep this information confidential.`,
    sender: 'me@example.com',
    recipient: 'team@example.com',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    read: true,
    folder: 'sent',
    encrypted: true,
    password: 'q4strategy',
    priority: 'high',
    labels: ['Work', 'Confidential'],
  },
  {
    id: '7',
    subject: 'Weekly Progress Update',
    body: `Hi Team,

Here's my weekly progress update:

Completed:
- Feature implementation
- Code review
- Documentation update

Next Week:
- Start new sprint
- Team training
- Client meeting

Best regards,
Me`,
    sender: 'me@example.com',
    recipient: 'manager@example.com',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    read: true,
    folder: 'sent',
    encrypted: false,
    password: '',
    priority: 'normal',
    labels: ['Work'],
  }
];