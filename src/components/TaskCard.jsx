import React from 'react';
import { MessageSquare, CheckCircle2, Circle, Timer, Ban, Network, Square } from 'lucide-react';
import { AssigneeAvatar, ActionMenu } from './SharedUI';

const getStatusIcon = (status, isMilestone) => {
  let color = "#94a3b8"; // default fallback
  const s = (status || '').toLowerCase();
  
  if (s.includes('complete')) color = "#10b981";
  else if (s.includes('progress') || s.includes('doing')) color = "#10b981";
  else if (s.includes('block')) color = "#94a3b8";
  else if (s.includes('to do') || s.includes('todo')) color = "#60a5fa";

  if (isMilestone) {
    return <Square size={14} color={color} style={{ transform: 'rotate(45deg)', margin: '2px' }} />;
  }

  if (s.includes('complete')) return <CheckCircle2 size={18} color={color} />;
  if (s.includes('progress') || s.includes('doing')) return <Timer size={18} color={color} />;
  if (s.includes('block')) return <Ban size={18} color={color} />;
  if (s.includes('to do') || s.includes('todo')) return <Circle size={18} color={color} />;
  
  return <Circle size={18} color={color} />;
};

const TaskCard = ({ task }) => {
  let assignees = [];
  if (task.Assignee && typeof task.Assignee === 'string') {
    assignees = task.Assignee.split(',').map(a => a.trim()).filter(a => a);
  }

  const isCompleted = task.Status === 'Completed';
  const isAtRisk = task.AtRisk === 'true' || task.AtRisk === 'Yes';
  const dateColor = isCompleted ? '#10b981' : (isAtRisk ? '#ef4444' : '#334155');
  const isMilestone = task["Is this a Billing Milestone?"] === 'true' || task["Is this a Billing Milestone?"] === 'Yes';

  return (
    <div className="task-card">
      <div className="card-top" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
          <div className="status-indicator" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2px' }}>
            {getStatusIcon(task.Status, isMilestone)}
          </div>
          <div className="card-title" style={{ marginTop: '0' }}>
            {task.TaskName}
          </div>
        </div>
        
        <div style={{ flexShrink: 0 }}>
          <ActionMenu position="right" />
        </div>
      </div>
      
      {task.StartDate && task.DueDate && (
        <div className="card-date" style={{ color: dateColor, fontWeight: 600, fontSize: '0.8rem', paddingLeft: '26px' }}>
          {new Date(task.StartDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - {new Date(task.DueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
        </div>
      )}
      
      <div style={{ borderBottom: '1px solid #f1f5f9', margin: '12px 0 8px 0' }}></div>
      
      <div className="card-bottom">
        <div className="assignees" style={{ display: 'flex', alignItems: 'center' }}>
          {assignees.slice(0, 3).map((assignee, i) => (
            <AssigneeAvatar key={i} assignee={assignee} i={i} />
          ))}
          {assignees.length > 3 && (
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#1e293b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', marginLeft: '-8px', border: '2px solid white' }}>
              +{assignees.length - 3}
            </div>
          )}
        </div>
        
        <div className="card-indicators" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {task.subtasksCount > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 500, color: '#64748b' }}>
              <Network size={14} /> {task.completedSubtasksCount}/{task.subtasksCount}
            </span>
          )}
          {task.Comments && task.Comments > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
              <MessageSquare size={12} /> {task.Comments}
            </span>
          )}
          <div className="avatar" style={{ width: '20px', height: '20px', backgroundColor: '#10b981', color: 'white', marginLeft: 'auto' }}>
            M
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
