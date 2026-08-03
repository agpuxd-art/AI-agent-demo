import React from 'react';
import { Circle, CheckCircle2, Timer, Ban } from 'lucide-react';
import TaskCard from './TaskCard';

const PhaseColumn = ({ phaseName, tasks }) => {
  // Determine phase start/end dates
  let phaseStart = null;
  let phaseEnd = null;
  
  let hasBlocked = false;
  let hasInProgress = false;
  let hasCompleted = false;
  let hasToDo = false;

  tasks.forEach(task => {
    if (task.StartDate && task.StartDate.trim() !== '') {
      const d = new Date(task.StartDate);
      if (!isNaN(d.getTime())) {
        if (!phaseStart || d < phaseStart) phaseStart = d;
      }
    }
    if (task.DueDate && task.DueDate.trim() !== '') {
      const d = new Date(task.DueDate);
      if (!isNaN(d.getTime())) {
        if (!phaseEnd || d > phaseEnd) phaseEnd = d;
      }
    }
    
    const status = (task.Status || '').toLowerCase();
    if (status.includes('block')) hasBlocked = true;
    else if (status.includes('progress') || status.includes('doing')) hasInProgress = true;
    else if (status.includes('complete')) hasCompleted = true;
    else hasToDo = true;
  });

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  };

  let PhaseIcon = <Circle size={16} color="#94a3b8" />;
  if (hasBlocked) PhaseIcon = <Ban size={16} color="#94a3b8" />;
  else if (hasInProgress || (hasCompleted && hasToDo)) PhaseIcon = <Timer size={16} color="#10b981" />;
  else if (hasCompleted && !hasToDo && !hasInProgress) PhaseIcon = <CheckCircle2 size={16} color="#10b981" />;
  else PhaseIcon = <Circle size={16} color="#60a5fa" />; // To do

  return (
    <div className="phase-column">
      <div className="phase-header" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        {PhaseIcon}
        <span className="phase-title">{phaseName || 'Unnamed Phase'}</span>
      </div>
      
      <div className="phase-dates">
        <span>{formatDate(phaseStart)}</span>
        <span>{formatDate(phaseEnd)}</span>
      </div>
      
      <div className="cards-container">
        {tasks.map((task, idx) => (
          <TaskCard key={task.TaskId || idx} task={task} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default PhaseColumn;
