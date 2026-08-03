import React, { useMemo } from 'react';
import PhaseColumn from './PhaseColumn';

const KanbanBoard = ({ tasks }) => {
  // Group tasks by Phase
  const phases = useMemo(() => {
    const grouped = {};
    
    // First, compute subtasks for each task
    const enhancedTasks = tasks.map(task => {
      const subtasks = tasks.filter(t => t.ParentTaskId === task.TaskId);
      const completedSubtasks = subtasks.filter(t => t.Status === 'Completed').length;
      return { ...task, subtasksCount: subtasks.length, completedSubtasksCount: completedSubtasks };
    });

    enhancedTasks.forEach(task => {
      const phase = task.Phase || 'Uncategorized';
      if (!grouped[phase]) {
        grouped[phase] = [];
      }
      grouped[phase].push(task);
    });

    // Define a standard order for phases if possible based on screenshot
    const standardOrder = ['Discovery & Planning', 'Configuration', 'Data migration', 'Performance & Reporting', 'Training & Handoff'];
    
    // Sort phases: those in standard order first, then remaining alphabetically
    return Object.keys(grouped).sort((a, b) => {
      const indexA = standardOrder.indexOf(a);
      const indexB = standardOrder.indexOf(b);
      
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    }).map(phaseName => ({
      name: phaseName,
      tasks: grouped[phaseName]
    }));
  }, [tasks]);

  return (
    <div className="board-container">
      <div className="kanban-board">
        {phases.map((phase, idx) => (
          <PhaseColumn key={idx} phaseName={phase.name} tasks={phase.tasks} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
