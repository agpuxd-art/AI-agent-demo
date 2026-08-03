import React, { useMemo, useState } from 'react';
import { CheckCircle2, Timer, Circle, Ban, Square, ChevronDown, ChevronRight } from 'lucide-react';
import { AssigneeAvatar, ActionMenu } from './SharedUI';

const TaskListView = ({ tasks }) => {
  const [expandedPhases, setExpandedPhases] = useState({});
  const [expandedTasks, setExpandedTasks] = useState({});

  const togglePhase = (phaseName) => {
    setExpandedPhases(prev => ({ ...prev, [phaseName]: prev[phaseName] === false ? true : false }));
  };

  const toggleTask = (taskId) => {
    setExpandedTasks(prev => ({ ...prev, [taskId]: prev[taskId] === false ? true : false }));
  };

  const getStatusIcon = (status, isMilestone, size = 18) => {
    let color = "#94a3b8"; 
    const s = (status || '').toLowerCase();
    
    if (s.includes('complete')) color = "#10b981";
    else if (s.includes('progress') || s.includes('doing')) color = "#10b981";
    else if (s.includes('block')) color = "#94a3b8";
    else if (s.includes('to do') || s.includes('todo')) color = "#60a5fa";
  
    if (isMilestone) {
      return <Square size={size} color={color} style={{ transform: 'rotate(45deg)' }} />;
    }
  
    if (s.includes('complete')) return <CheckCircle2 size={size} color={color} />;
    if (s.includes('progress') || s.includes('doing')) return <Timer size={size} color={color} />;
    if (s.includes('block')) return <Ban size={size} color={color} />;
    if (s.includes('to do') || s.includes('todo')) return <Circle size={size} color={color} />;
    
    return <Circle size={size} color={color} />;
  };

  const renderAssignees = (assigneeString) => {
    if (!assigneeString) return '-';
    const assignees = assigneeString.split(',').map(a => a.trim()).filter(a => a);
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {assignees.slice(0, 3).map((assignee, i) => (
          <AssigneeAvatar key={i} assignee={assignee} i={i} />
        ))}
        {assignees.length > 3 && (
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#1e293b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 'bold', marginLeft: '-8px', border: '2px solid white' }}>
            +{assignees.length - 3}
          </div>
        )}
      </div>
    );
  };

  const calculateDuration = (start, due) => {
    if (!start || !due) return '-';
    const s = new Date(start);
    const d = new Date(due);
    const diffTime = Math.abs(d - s);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return '1d';
    if (diffDays >= 7 && diffDays % 7 === 0) return `${diffDays / 7}w`;
    return `${diffDays}d`;
  };

  // Build hierarchy and compute phase status
  const hierarchy = useMemo(() => {
    const phases = {};
    const taskIds = new Set(tasks.map(t => t.TaskId));
    
    tasks.forEach(task => {
      const phase = task.Phase || 'Uncategorized';
      if (!phases[phase]) phases[phase] = { name: phase, rootTasks: [], allTasks: [] };
      
      phases[phase].allTasks.push(task);
      
      if (!task.ParentTaskId || !taskIds.has(task.ParentTaskId)) {
        phases[phase].rootTasks.push({
          ...task,
          subtasks: tasks.filter(t => t.ParentTaskId === task.TaskId)
        });
      }
    });

    // Compute phase statuses
    Object.values(phases).forEach(phase => {
      let status = 'To do';
      if (phase.allTasks.length > 0) {
        if (phase.allTasks.some(t => (t.Status || '').toLowerCase().includes('block'))) {
          status = 'Blocked';
        } else if (phase.allTasks.every(t => (t.Status || '').toLowerCase().includes('complete'))) {
          status = 'Completed';
        } else if (phase.allTasks.some(t => (t.Status || '').toLowerCase().includes('progress') || (t.Status || '').toLowerCase().includes('doing') || (t.Status || '').toLowerCase().includes('complete'))) {
          status = 'In Progress';
        }
      }
      phase.status = status;
    });

    return phases;
  }, [tasks]);

  return (
    <div style={{ padding: '24px', overflowY: 'auto', flex: 1, backgroundColor: '#ffffff' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ color: '#64748b', borderBottom: '1px solid #f1f5f9' }}>
            <th style={{ padding: '16px 16px', fontWeight: 600, color: '#0f172a' }}>Project plan</th>
            <th style={{ padding: '16px 16px', width: '120px', fontWeight: 500 }}>Assignee</th>
            <th style={{ padding: '16px 16px', width: '100px', fontWeight: 500 }}>Start Date</th>
            <th style={{ padding: '16px 16px', width: '100px', fontWeight: 500 }}>Duration</th>
            <th style={{ padding: '16px 16px', width: '100px', fontWeight: 500 }}>Due Date</th>
            <th style={{ padding: '16px 16px', width: '40px' }}></th>
          </tr>
        </thead>
        <tbody>
          {Object.values(hierarchy).map((phase, pIdx) => {
            const isPhaseExpanded = expandedPhases[phase.name] !== false; // true by default
            return (
              <React.Fragment key={`phase-${pIdx}`}>
                {/* Phase Header Row */}
                <tr 
                  onClick={() => togglePhase(phase.name)}
                  style={{ cursor: 'pointer', transition: 'background-color 0.2s', borderBottom: '1px solid #f8fafc' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td colSpan="6" style={{ padding: '16px 16px', fontWeight: 600, color: '#0f172a', fontSize: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px' }}>
                        {isPhaseExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </div>
                      {getStatusIcon(phase.status, false, 20)}
                      {phase.name}:
                    </div>
                  </td>
                </tr>
                
                {/* Root Tasks & Subtasks */}
                {isPhaseExpanded && phase.rootTasks.map((task) => {
                  const isTaskExpanded = expandedTasks[task.TaskId] !== false;
                  const isMilestone = task["Is this a Billing Milestone?"] === 'true' || task["Is this a Billing Milestone?"] === 'Yes';
                  const hasSubtasks = task.subtasks && task.subtasks.length > 0;
                  
                  return (
                    <React.Fragment key={`task-${task.TaskId}`}>
                      {/* Parent Task Row */}
                      <tr 
                        style={{ borderBottom: '1px solid #f8fafc', transition: 'background-color 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '12px 16px', paddingLeft: '28px', color: '#1e293b' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div 
                              onClick={() => hasSubtasks && toggleTask(task.TaskId)}
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', cursor: hasSubtasks ? 'pointer' : 'default' }}
                            >
                              {hasSubtasks ? (isTaskExpanded ? <ChevronDown size={18} color="#64748b" /> : <ChevronRight size={18} color="#64748b" />) : <div style={{ width: '18px' }} />}
                            </div>
                            {getStatusIcon(task.Status, isMilestone, 18)}
                            <span style={{ cursor: hasSubtasks ? 'pointer' : 'default' }} onClick={() => hasSubtasks && toggleTask(task.TaskId)}>{task.TaskName}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px' }}>{renderAssignees(task.Assignee)}</td>
                        <td style={{ padding: '12px 16px', color: '#64748b' }}>
                          {task.StartDate ? new Date(task.StartDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '-'}
                        </td>
                        <td style={{ padding: '12px 16px', color: '#64748b' }}>
                          {calculateDuration(task.StartDate, task.DueDate)}
                        </td>
                        <td style={{ padding: '12px 16px', color: '#64748b' }}>
                          {task.DueDate ? new Date(task.DueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '-'}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                          <ActionMenu position="right" />
                        </td>
                      </tr>

                      {/* Subtasks Rows */}
                      {isTaskExpanded && task.subtasks.map((subtask) => {
                        const isSubMilestone = subtask["Is this a Billing Milestone?"] === 'true' || subtask["Is this a Billing Milestone?"] === 'Yes';
                        return (
                          <tr 
                            key={`subtask-${subtask.TaskId}`} 
                            style={{ borderBottom: '1px solid #f8fafc', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <td style={{ padding: '12px 16px', paddingLeft: '72px', color: '#475569' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {getStatusIcon(subtask.Status, isSubMilestone, 18)}
                                {subtask.TaskName}
                              </div>
                            </td>
                            <td style={{ padding: '12px 16px' }}>{renderAssignees(subtask.Assignee)}</td>
                            <td style={{ padding: '12px 16px', color: '#64748b' }}>
                              {subtask.StartDate ? new Date(subtask.StartDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '-'}
                            </td>
                            <td style={{ padding: '12px 16px', color: '#64748b' }}>
                              {calculateDuration(subtask.StartDate, subtask.DueDate)}
                            </td>
                            <td style={{ padding: '12px 16px', color: '#64748b' }}>
                              {subtask.DueDate ? new Date(subtask.DueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '-'}
                            </td>
                            <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                              <ActionMenu position="right" />
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListView;
