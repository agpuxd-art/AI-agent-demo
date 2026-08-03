import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle2, ArrowRight, CornerDownRight, Clock, Folder, MessageSquare, AlertCircle, Sparkles, Circle, Ban, ChevronRight as ChevronRightIcon, ThumbsUp, ThumbsDown, RotateCcw, Edit2, Copy, Square } from 'lucide-react';

const ThoughtBadge = ({ seconds, logs }) => {
  const [expanded, setExpanded] = useState(false);
  const text = logs ? `Worked for ${seconds} seconds` : `Thought for ${seconds} seconds`;
  
  return (
    <div style={{ marginBottom: '12px' }}>
      <div 
        onClick={() => setExpanded(!expanded)}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', backgroundColor: '#f1f5f9', padding: '4px 10px', borderRadius: '12px', transition: 'background-color 0.2s' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
      >
        <Sparkles size={14} color="#8b5cf6" /> 
        {text}
        <ChevronRightIcon size={14} style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', marginLeft: '4px' }} />
      </div>
      
      {expanded && logs && (
        <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '0.8rem', color: '#475569', fontFamily: 'monospace' }}>
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: i < logs.length - 1 ? '4px' : '0', display: 'flex', gap: '8px' }}>
              <span style={{ color: '#94a3b8', minWidth: '32px' }}>{log.time}</span>
              <span>{log.action}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MicroSurvey = () => {
  const [submitted, setSubmitted] = useState(false);
  const [accurate, setAccurate] = useState(null);
  const [effortless, setEffortless] = useState(null);

  if (submitted) {
    return (
      <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#ecfdf5', borderRadius: '8px', border: '1px solid #a7f3d0', color: '#047857', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <CheckCircle2 size={16} /> Thank you for your feedback!
      </div>
    );
  }

  return (
    <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', fontSize: '0.9rem', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#475569', fontWeight: 500 }}>Was this resolution accurate?</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setAccurate(true)} style={{ backgroundColor: accurate === true ? '#e2e8f0' : 'white', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '4px 12px', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s' }}>👍</button>
          <button onClick={() => setAccurate(false)} style={{ backgroundColor: accurate === false ? '#e2e8f0' : 'white', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '4px 12px', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s' }}>👎</button>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#475569', fontWeight: 500 }}>How effortless was this flow?</span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[1, 2, 3, 4, 5].map(num => (
            <button key={num} onClick={() => setEffortless(num)} style={{ backgroundColor: effortless === num ? '#3b82f6' : 'white', color: effortless === num ? 'white' : '#475569', border: effortless === num ? '1px solid #3b82f6' : '1px solid #cbd5e1', borderRadius: '4px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 500, fontSize: '0.85rem', transition: 'all 0.2s' }}>
              {num}
            </button>
          ))}
        </div>
      </div>
      {accurate !== null && effortless !== null && (
        <button onClick={() => setSubmitted(true)} style={{ marginTop: '8px', padding: '8px 16px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start', fontSize: '0.85rem' }}>Submit Feedback</button>
      )}
    </div>
  );
};

const UndoToast = ({ onUndo, onCommit, text }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  
  useEffect(() => {
    if (timeLeft <= 0) {
      onCommit();
      return;
    }
    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onCommit]);

  return (
    <div style={{ position: 'absolute', bottom: '100px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1e293b', color: 'white', padding: '16px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 1000, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{text}</span>
        <div style={{ height: '4px', backgroundColor: '#334155', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
          <div style={{ height: '100%', backgroundColor: '#8b5cf6', width: `${(timeLeft / 5) * 100}%`, transition: 'width 1s linear' }}></div>
        </div>
      </div>
      <button onClick={onUndo} style={{ backgroundColor: 'transparent', border: '1px solid #475569', color: '#cbd5e1', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' }}>Undo Batch Action</button>
      <button onClick={onCommit} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '1.2rem', lineHeight: 1 }}>×</div>
      </button>
    </div>
  );
};

const GovernanceAgent = ({ initialQuery, setInitialQuery, project, tasks, session, updateSession, onTasksCompleted, onAllTasksCompleted, onAllProjectsCompleted }) => {
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState('tree');
  const [pendingBatchAction, setPendingBatchAction] = useState(null);
  
  const messagesEndRef = useRef(null);
  const hasFired = useRef(false);
  const activeTimeoutsRef = useRef(new Set());

  const setAgentTimeout = (cb, ms) => {
    const id = setTimeout(() => {
      activeTimeoutsRef.current.delete(id);
      cb();
    }, ms);
    activeTimeoutsRef.current.add(id);
    return id;
  };

  const handleStop = () => {
    activeTimeoutsRef.current.forEach(clearTimeout);
    activeTimeoutsRef.current.clear();
    updateSession({ 
      isProcessing: false, 
      processingStep: 0, 
      messages: [...session.messages, { id: Date.now(), sender: 'system', text: 'You stopped this response', isStopped: true }] 
    });
  };

  const { messages, activeConflict, isProcessing, processingStep } = session || { messages: [], activeConflict: null, isProcessing: false, processingStep: 0 };

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = ["Try: Mark all the projects completed", "Try: Wrap lisa's work with in end of the week"];
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    if (messages.length > 0) return;
    
    const fullText = placeholders[placeholderIndex];
    if (isDeleting) {
      if (currentPlaceholder.length === 0) {
        setIsDeleting(false);
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        timeout = setTimeout(() => {}, 500);
      } else {
        timeout = setTimeout(() => {
          setCurrentPlaceholder(currentPlaceholder.slice(0, -1));
        }, 50);
      }
    } else {
      if (currentPlaceholder.length === fullText.length) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timeout = setTimeout(() => {
          setCurrentPlaceholder(fullText.slice(0, currentPlaceholder.length + 1));
        }, 100);
      }
    }
    return () => clearTimeout(timeout);
  }, [currentPlaceholder, isDeleting, placeholderIndex, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeConflict, activeTab, isProcessing, processingStep]);

  useEffect(() => {
    if (initialQuery && !hasFired.current) {
      hasFired.current = true;
      handleSend(initialQuery);
      if (setInitialQuery) setInitialQuery('');
    }
  }, [initialQuery, setInitialQuery]);

  const buildDynamicConflict = () => {
    if (!tasks || tasks.length === 0) return null;
    
    // Group tasks by ProjectId
    const tasksByProject = {};
    for (const t of tasks) {
      if (!tasksByProject[t.ProjectId]) tasksByProject[t.ProjectId] = [];
      tasksByProject[t.ProjectId].push(t);
    }
    
    // Find a project that has at least 4 tasks
    const validProjectId = Object.keys(tasksByProject).find(id => tasksByProject[id].length >= 4);
    if (!validProjectId) return null;
    
    const pTasks = tasksByProject[validProjectId];
    
    let l2 = pTasks[1]; // Simulate Milestone
    let l3 = pTasks[2]; // Simulate Subtask
    let l4 = pTasks[3]; // Simulate Root Cause
    
    return {
      l1: { id: pTasks[0].ProjectId, name: pTasks[0].ProjectName },
      l2: { id: l2.TaskId, name: l2.TaskName },
      l3: { id: l3.TaskId, name: l3.TaskName },
      l4: { id: l4.TaskId, name: l4.TaskName, hours: l4.HoursTracked || '0.00' },
      resolved: false
    };
  };

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;
    
    const userMsg = { id: Date.now(), sender: 'user', text: text };
    const newMessages = messages.map(m => m.prompts ? { ...m, prompts: null } : m).concat(userMsg);
    
    // Initial update
    updateSession({ title: messages.length === 0 ? text : session.title, messages: newMessages, isProcessing: true, processingStep: 1 });
    setInputValue('');

    const textLower = text.toLowerCase();
    
    if (textLower.includes('notify lisa via slack')) {
      setAgentTimeout(() => updateSession({ processingStep: 20 }), 1500);
      setAgentTimeout(() => updateSession({ processingStep: 21 }), 3000);

      setAgentTimeout(() => {
        const agentMsg = { 
          id: Date.now(), 
          sender: 'agent', 
          text: `Slack integration isn't available yet, so notifications can't be sent.\nEnable Slack integration first, then retry the action for downstream communication.`,
          thoughtSeconds: 5,
          logs: [
            { time: '0.0s', action: 'Reaching Slack' },
            { time: '1.5s', action: 'Verifying Slack integration' },
            { time: '4.8s', action: 'Failed to find active integration' }
          ]
        };
        updateSession({ messages: [...newMessages, agentMsg], isProcessing: false, processingStep: 0 });
      }, 5000);
      return;
    }

    if (textLower.includes('lisa')) {
      setAgentTimeout(() => updateSession({ processingStep: 7 }), 1500);
      setAgentTimeout(() => updateSession({ processingStep: 8 }), 3000);

      setAgentTimeout(() => {
        const pName = project?.ProjectName || "Active Project";
        const pId = project?.ProjectId || "PRJ-005";
        const projectTasks = tasks ? tasks.filter(t => t.ProjectId === pId) : [];
        const lisaTasks = projectTasks.filter(t => t.Assignee && t.Assignee.includes('Lisa'));
        const inProgressTask = lisaTasks.find(t => t.Status === 'In progress' || t.Status === 'In Progress') || { TaskId: 'TSK-0217', TaskName: 'Functional configuration', Status: 'In Progress' };
        const todoTasks = lisaTasks.filter(t => t.Status === 'To do' || t.Status === 'To Do');
        const todoTask1 = todoTasks[0] || { TaskId: 'TSK-0218', TaskName: 'Update CS Transition Checklist', Status: 'To Do' };
        const todoTask2 = todoTasks[1] || { TaskId: 'TSK-0219', TaskName: 'Update CS Knowledge Repository', Status: 'To Do' };
        
        // Find other team members for reassignment
        const allAssignees = projectTasks.flatMap(t => t.Assignee ? t.Assignee.split(',').map(s => s.trim()) : []);
        const otherMembers = [...new Set(allAssignees)].filter(a => a && !a.includes('Lisa'));
        const assignee1 = otherMembers[0] || 'Cameron Fisher';
        const assignee2 = otherMembers[1] || 'April Frost';
        const assignee3 = otherMembers[2] || 'Diane Evans';

        const agentMsg = { 
          id: Date.now(), 
          sender: 'agent', 
          text: `I audited Lisa Allen's current workload. She is currently active on 1 project (${pName}) with ${lisaTasks.length > 0 ? lisaTasks.length : 3} open tasks scheduled for this week.`,
          isLisaPhase1: true,
          projectId: pId,
          projectName: pName,
          inProgressTask,
          todoTask1,
          todoTask2,
          assignee1,
          assignee2,
          assignee3,
          lisaTaskCount: lisaTasks.length > 0 ? lisaTasks.length : 3,
          thoughtSeconds: 4,
          logs: [
            { time: '0.0s', action: 'Initiated wrap-up sequence for Lisa' },
            { time: '1.2s', action: 'Scanned active projects for assignments' },
            { time: '2.5s', action: 'Found open tasks on ' + pName },
            { time: '3.8s', action: 'Generated reassignment matrix' }
          ]
        };
        updateSession({ messages: [...newMessages, agentMsg], isProcessing: false, processingStep: 0 });
      }, 5000);
      return;
    }

    
    
    if (textLower.includes('see all projects')) {
      const el = document.querySelector('.sidebar-icon[title="Projects: View all projects and their Kanban boards"]');
      if (el) el.click();
      return;
    }

    if (messages.some(m => m.isReassignmentResolved === 'manual') && !textLower.includes('complete') && !textLower.includes('lisa')) {
      setAgentTimeout(() => {
        updateSession({ processingStep: 9 });
      }, 1000);

      setAgentTimeout(() => {
        const basePrompts = [
          { label: 'See all Projects' },
          { label: 'Mark all my projects completed' }
        ];
        
        const successMsg = { 
          id: Date.now(), 
          sender: 'agent', 
          text: `Got it. I've manually updated the tasks according to your instructions and sent calendar updates.\n\nLisa's week is now wrapped up!`,
          thoughtSeconds: 2,
          logs: [
            { time: '0.0s', action: 'Parsed manual assignments' },
            { time: '1.2s', action: 'Updated task assignees' },
            { time: '2.0s', action: 'Sent notifications' }
          ],
          prompts: basePrompts,
          isReassignmentFlow: true,
          isReassignmentResolved: 'manual_done'
        };
        
        const prevMessages = messages.map(m => m.isReassignmentFlow && !m.isReassignmentResolved ? { ...m, isReassignmentResolved: 'manual_pending' } : m);
        
        updateSession({ 
          messages: [...prevMessages, successMsg],
          isProcessing: false,
          processingStep: 0
        });
      }, 3000);
      return;
    }

    if (textLower.includes('mark all') || textLower.includes('complete') || textLower.includes('close') || textLower.includes('finish') || textLower.includes('resolve')) {

      const didResolveBlocker = messages.some(m => m.text && m.text.includes('Since this was the final blocker'));
      const allCompleted = tasks && tasks.length > 0 && tasks.every(t => t.Status === 'Completed') && didResolveBlocker;
      
      if (allCompleted) {
        updateSession({ isProcessing: true, processingStep: 1 });
        setAgentTimeout(() => updateSession({ processingStep: 16 }), 1500);
        setAgentTimeout(() => {
          const alreadyCompletedMsg = {
            id: Date.now(),
            sender: 'agent',
            text: 'All the projects in this portfolio is already closed, try another prompt',
            thoughtSeconds: 3,
            logs: [
              { time: '0.0s', action: 'Scanning all projects in portfolio' },
              { time: '1.5s', action: 'Verifying completion status' },
              { time: '2.8s', action: 'Confirmed no active projects remain' }
            ],
            prompts: [
              { label: "Try: Wrap lisa's work with in this friday" }
            ]
          };
          updateSession({ messages: [...newMessages, alreadyCompletedMsg], isProcessing: false, processingStep: 0 });
        }, 3000);
        return;
      }

      // Step 2
      setAgentTimeout(() => {
        updateSession({ processingStep: 2 });
      }, 1500);

      // Step 3
      setAgentTimeout(() => {
        updateSession({ processingStep: 3 });
      }, 3000);

      // Final
      setAgentTimeout(() => {
        const pName = "Bowen-Chapman - Enterprise Rollout";
        const pId = "PRJ-005";
        
        const agentMsg = { 
          id: Date.now(), 
          sender: 'agent', 
          text: `I have audited your active projects. PRJ‑005 contains open blockers that must be resolved before closure. As a result, the ‘Mark All Projects Completed’ process is currently on hold. Please resolve the blocker to re‑initiate the completion process.\n\nOn selecting ‘Inspect PRJ-005’, I will review the project details and identify any blockers. Once you choose ‘Auto Resolve Blockers and Complete’, I will calculate the historical logging average for the task, then log, resolve, and initiate the project-closing process\n\nSelect a action to proceed`,
          isProjectAudit: true,
          projectId: pId,
          projectName: pName,
          blockerText: "1 open milestone task",
          thoughtSeconds: 4,
          logs: [
            { time: '0.0s', action: 'Initiated project completion sequence' },
            { time: '1.2s', action: 'Scanning active project tasks' },
            { time: '2.5s', action: 'Checking timesheet and QA policies' },
            { time: '3.8s', action: 'Identified blockers on ' + pId }
          ]
        };
        updateSession({ messages: [...newMessages, agentMsg], isProcessing: false, processingStep: 0 });
      }, 4000);
      
    } else {
      setAgentTimeout(() => {
        const agentMsg = { id: Date.now(), sender: 'agent', text: 'I am specifically trained for this demo to handle project completion and governance policies. Try saying "Mark all my projects completed" or "Wrap up lisa\'s work before the end of the week"' };
        updateSession({ messages: [...newMessages, agentMsg], isProcessing: false, processingStep: 0 });
      }, 1200);
    }
  };

  const handleResolveDeepest = (timeValue) => {
    updateSession({ isProcessing: true, processingStep: 4 });
    
    setAgentTimeout(() => {
      updateSession({ processingStep: 5 });
    }, 1500);

    setAgentTimeout(() => {
      updateSession({ processingStep: 6 });
    }, 3000);

    setAgentTimeout(() => {
      const resolvedConflict = { ...activeConflict, resolved: true, timeLogged: timeValue };
      
      const basePrompts = [
        { label: 'See all Projects' },
        { label: 'Wrap up lisa\'s work before the end of the week' }
      ];
      
      const successMsg = { 
        id: Date.now(), 
        sender: 'agent', 
        text: `Successfully logged ${timeValue} to "${activeConflict.l4.id}". Cascade triggered!\n✓ "${activeConflict.l4.id}" completed.\n✓ "${activeConflict.l3.id}" completed.\n✓ "${activeConflict.l2.id}" milestone completed.\n✓ Project "${activeConflict.l1.id}" marked as completed.\n\nSince this was the final blocker across your portfolio, all of your active projects have now been successfully closed out.`,
        thoughtSeconds: 5,
        logs: [
          { time: '0.0s', action: 'Received resolution input' },
          { time: '0.5s', action: 'Validated timesheet format' },
          { time: '1.2s', action: `Updated "${activeConflict.l4.id}" timesheet logs` },
          { time: '2.5s', action: 'Triggered upstream completion cascade' },
          { time: '4.1s', action: 'Closed portfolio projects' }
        ],
        prompts: basePrompts
      };
      
      updateSession({ 
        activeConflict: resolvedConflict, 
        messages: [...messages, successMsg],
        isProcessing: false,
        processingStep: 0
      });

      // Update global task data
      if (onAllProjectsCompleted) onAllProjectsCompleted();
      if (onAllTasksCompleted) {
        onAllTasksCompleted();
      } else if (onTasksCompleted) {
        onTasksCompleted([activeConflict.l2.id, activeConflict.l3.id, activeConflict.l4.id]);
      }
    }, 5000);
  };

  const handleAutoReassign = (currentMessages = messages) => {
    updateSession({ isProcessing: true, processingStep: 9 });
    
    setTimeout(() => {
      updateSession({ processingStep: 10 });
    }, 1500);

    setTimeout(() => {
      updateSession({ processingStep: 11 });
    }, 3000);

    setTimeout(() => {
      const basePrompts = [
        { label: 'See all Projects' },
        { label: 'Mark all my projects completed' }
      ];
      
      const successMsg = { 
        id: Date.now(), 
        sender: 'agent', 
        text: `Successfully reassigned Lisa's 3 tasks to available team members and dispatched calendar updates.\n\nHere is how I distributed the workload based on current sprint capacity:\n- Diane Evans had 30% capacity remaining this week, so I assigned her the functional configuration task.\n- Cameron Fisher and April Frost both had light workloads in the CS transition phase, making them optimal for the remaining tasks.\n\nLisa's week is now wrapped up!`,
        thoughtSeconds: 3,
        logs: [
          { time: '0.0s', action: 'Initiated auto-reassign protocol' },
          { time: '0.9s', action: 'Matched tasks to team capacity' },
          { time: '1.8s', action: 'Updated task assignees' },
          { time: '2.4s', action: 'Sent notification emails to Diane, Cameron, April' },
          { time: '3.0s', action: "Cleared Lisa's calendar blockers" }
        ],
        prompts: basePrompts,
        isReassignmentFlow: true,
        isReassignmentResolved: 'auto'
      };
      
      const prevMessages = currentMessages.map(m => m.isReassignmentFlow && !m.isReassignmentResolved ? { ...m, prompts: null, isReassignmentResolved: 'auto_pending' } : m);
      
      updateSession({ 
        messages: [...prevMessages, successMsg],
        isProcessing: false,
        processingStep: 0
      });
    }, 4500);
  };

  const handleManualReassign = (currentMessages = messages) => {
    updateSession({ isProcessing: true, processingStep: 9 });
    
    setTimeout(() => {
      const manualMsg = { 
        id: Date.now(), 
        sender: 'agent', 
        text: `Sure. Please tell me who you would like to assign the 3 open tasks on P1 Platform Deployment to.\n\n(For example, you could say: "Assign TSK-0217 to Susan Serrano and the other two to Anthony Harmon")`,
        isReassignmentResolved: 'manual'
      };
      
      const prevMessages = currentMessages.map(m => m.isReassignmentFlow && !m.isReassignmentResolved ? { ...m, prompts: null } : m);
      
      updateSession({ 
        messages: [...prevMessages, manualMsg],
        isProcessing: false,
        processingStep: 0
      });
    }, 1500);
  };

  // Status Icons matching README legend
  const renderMilestoneIcon = (color) => (
    <div style={{ width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '12px', height: '12px', backgroundColor: color, transform: 'rotate(45deg)', borderRadius: '2px' }}></div>
    </div>
  );
  
  const renderStandardTaskIcon = (color) => (
    <div style={{ width: '16px', height: '16px', border: `2.5px solid ${color}`, borderRadius: '50%' }}></div>
  );

  const renderBlockedIcon = () => (
    <Ban size={18} color="#94a3b8" />
  );

  const getProcessingText = () => {
    if (processingStep === 1) return "Finding all the projects...";
    if (processingStep === 2) return "Investigating phases...";
    if (processingStep === 3) return "Looking on status of tasks, subtasks, milestones...";
    if (processingStep === 4) return "Working on logging time...";
    if (processingStep === 5) return "Time logged";
    if (processingStep === 6) return "Now trying to close the project...";
    if (processingStep === 7) return "Scanning active projects for Lisa's assignments...";
    if (processingStep === 8) return "Identifying tasks due before Friday...";
    if (processingStep === 9) return "Preparing handover matrix...";
    if (processingStep === 10) return "Reassigning tasks to team members...";
    if (processingStep === 11) return "Sending calendar updates...";
    if (processingStep === 12) return "Calculating the ideal time to log…";
    if (processingStep === 13) return "Logging the calculated time…";
    if (processingStep === 14) return "Time successfully logged.";
    if (processingStep === 15) return "Now attempting to close...";
    if (processingStep === 16) return "Verifying project statuses...";
    if (processingStep === 17) return "Looking into the task…";
    if (processingStep === 18) return "Working out possible fixes…";
    if (processingStep === 19) return "Getting the controls ready…";
    return "Processing request...";
  };

  // Render Empty State
  if (messages.length === 0 && !isProcessing) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: '#ffffff', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '300px', background: 'radial-gradient(circle, rgba(224,231,255,1) 0%, rgba(255,255,255,0) 70%)', zIndex: 0, pointerEvents: 'none' }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '600px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={24} color="white" />
            </div>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#0f172a', marginBottom: '32px' }}>What should we govern together?</h1>
          
          <div style={{ 
            display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: '24px', 
            padding: '8px 16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
          }}>
            <textarea 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={currentPlaceholder} 
              rows={2}
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '1rem', color: '#1e293b', padding: '12px 0 12px 12px', resize: 'none', overflow: 'hidden', fontFamily: 'inherit' }} 
            />
            <div 
              onClick={() => handleSend()}
              style={{ 
                width: '32px', height: '32px', borderRadius: '50%', 
                backgroundColor: inputValue.trim() ? '#3b82f6' : '#f1f5f9', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'background-color 0.2s',
                flexShrink: 0, marginLeft: '8px'
              }}
            >
              <ArrowRight size={16} color={inputValue.trim() ? "white" : "#64748b"} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
            <button onClick={() => handleSend("Mark all the projects completed")} style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#475569', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              Try: Mark all the projects completed
            </button>
            <button onClick={() => handleSend("Wrap lisa's work with in end of the week")} style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#475569', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              Try: Wrap lisa's work with in end of the week
            </button>
          </div>
        </div>
      </div>
    );
  }

  
  const handleAutoResolveComplete = (msg) => {
    setPendingBatchAction({
      type: 'auto',
      msgId: msg.id,
      msg,
      text: 'Marking 4 projects as completed.'
    });
  };

  const commitAutoResolveComplete = (msg) => {
    const userMsg = { id: Date.now(), sender: 'user', text: 'Auto-resolve blockers & complete' };
    updateSession({ messages: [...session.messages.map(m => m.id === msg.id ? { ...m, isResolved: true } : m), userMsg], isProcessing: true, processingStep: 12 });
    
    setAgentTimeout(() => updateSession({ processingStep: 13 }), 2500);
    setAgentTimeout(() => updateSession({ processingStep: 14 }), 5000);
    setAgentTimeout(() => updateSession({ processingStep: 15 }), 7500);

    setAgentTimeout(() => {
      const triageMsg = {
        ...msg,
        id: Date.now() + 1,
        sender: 'agent',
        text: 'The expected missing time has been calculated based on historical data as 02:30 and successfully logged. Since this was the final blocker across your portfolio, all active projects have now been closed successfully.',
        isPhase3: true,
        isProjectAudit: false,
        projectId: msg.projectId,
        projectName: msg.projectName,
        timeLogged: '02:30',
        thoughtSeconds: 10,
        logs: [
          { time: '0.0s', action: 'Finding the root cause' },
          { time: '2.0s', action: 'Time is not logged' },
          { time: '4.0s', action: 'Calculating ideal time to log' },
          { time: '6.5s', action: 'Logging the calculated time now' },
          { time: '8.5s', action: 'Successfully logged' }
        ],
        prompts: [
          { label: "Try: Wrap lisa's work with in this friday" }
        ],
        showSurvey: true
      };
      if (onAllProjectsCompleted) onAllProjectsCompleted();
      if (onAllTasksCompleted) onAllTasksCompleted();
      updateSession({ messages: [...session.messages.map(m => m.id === msg.id ? { ...m, isResolved: true } : m), userMsg, triageMsg], isProcessing: false, processingStep: 0 });
    }, 10000);
  };

  const handleInspectDetails = (msg) => {
    const userMsg = { id: Date.now(), sender: 'user', text: 'Inspect PRJ-005 details' };
    updateSession({ messages: [...messages.map(m => m.id === msg.id ? { ...m, isResolved: true } : m), userMsg], isProcessing: true, processingStep: 17 });
    
    setAgentTimeout(() => updateSession({ processingStep: 18 }), 3500);
    setTimeout(() => updateSession({ processingStep: 19 }), 7800);

    setTimeout(() => {
      const triageMsg = {
        ...msg,
        id: Date.now() + 1,
        sender: 'agent',
        text: 'Project closeout for PRJ-005 (Bowen-Chapman - Enterprise Rollout) is currently halted due to an unfulfilled timesheet policy down at Level 4.',
        isPhase2: true,
        isProjectAudit: false,
        projectId: msg.projectId,
        projectName: msg.projectName,
        thoughtSeconds: 10,
        logs: [
          { time: '0.0s', action: 'Accessing task details' },
          { time: '3.5s', action: 'Calculating resolution suggestions' },
          { time: '7.8s', action: 'Preparing interactive controls' }
        ]
      };
      updateSession({ messages: [...messages.map(m => m.id === msg.id ? { ...m, isResolved: true } : m), userMsg, triageMsg], isProcessing: false, processingStep: 0 });
    }, 10000);
  };

  const handleOverrideExecution = (msg, newTime, reason) => {
    setPendingBatchAction({
      type: 'manual',
      msgId: msg.id,
      msg,
      newTime,
      reason,
      text: '1 project marked as completed.'
    });
  };

  const commitOverrideExecution = (msg, newTime, reason) => {
    const userMsg = { id: Date.now(), sender: 'user', text: `Resolve TSK‑0004 • Starter Kit Walkthrough by logging the time as ${newTime}` };
    updateSession({ messages: [...session.messages.map(m => m.id === msg.id ? { ...m, isResolved: true } : m), userMsg], isProcessing: true, processingStep: 4 });
    
    setAgentTimeout(() => {
      const overrideMsg = {
        ...msg,
        id: Date.now(),
        sender: 'agent',
        text: 'The given time is logged and blockers are resolved. Since this was the final blocker across your portfolio, all of your active projects have now been successfully closed out.',
        isPhase3: true,
        isPhase2: false,
        projectId: msg.projectId,
        projectName: msg.projectName,
        timeLogged: newTime,
        thoughtSeconds: 8,
        logs: [
          { time: '0.0s', action: 'Logging the given value to the task' },
          { time: '3.0s', action: 'Successfully logged' },
          { time: '5.8s', action: 'Now attempting to close all the projects' }
        ],
        prompts: [{ label: "Try: Wrap lisa's work within this weekend" }],
        showSurvey: true
      };
      if (onAllProjectsCompleted) onAllProjectsCompleted();
      if (onAllTasksCompleted) onAllTasksCompleted();
      updateSession({ messages: [...session.messages.map(m => m.id === msg.id ? { ...m, isResolved: true, timeLogged: newTime } : m), userMsg, overrideMsg], isProcessing: false, processingStep: 0 });
    }, 8000);
  };

  const handleFinalExecution = (msg) => {
    updateSession({ isProcessing: true, processingStep: 6 });
    
    setAgentTimeout(() => {
      const finalMsg = {
        ...msg,
        id: Date.now(),
        sender: 'agent',
        text: 'Successfully closed out all active portfolio projects. All task metrics have been logged and status reports dispatched to stakeholders.',
        isPhase4: true,
        projectId: msg.projectId,
        projectName: msg.projectName,
        timeLogged: msg.timeLogged,
        thoughtSeconds: 2,
        logs: [
          { time: '0.0s', action: 'Archiving projects' },
          { time: '1.2s', action: 'Locking timesheets for Q3' },
          { time: '1.9s', action: 'Dispatching final status reports' }
        ],
        prompts: [{ label: "Try wrap lisa's work within this weekend" }]
      };
      updateSession({ messages: [...messages.map(m => m.id === msg.id ? { ...m, isResolved: true } : m), finalMsg], isProcessing: false, processingStep: 0 });
      if (onAllTasksCompleted) onAllTasksCompleted();
    }, 2000);
  };

  
  const handleInspectLisaDetails = (msg) => {
    const userMsg = { id: Date.now(), sender: 'user', text: "Inspect & adjust Lisa's tasks" };
    updateSession({ messages: [...messages.map(m => m.id === msg.id ? { ...m, isResolved: true } : m), userMsg], isProcessing: true, processingStep: 2 });
    setTimeout(() => {
      const triageMsg = {
        ...msg,
        id: Date.now(),
        sender: 'agent',
        text: 'Here is the breakdown of Lisa\'s pending tasks for ' + msg.projectName + ':',
        isLisaPhase1: false,
        isLisaPhase2: true,
        thoughtSeconds: 2,
        logs: [
          { time: '0.0s', action: 'Accessing task details' },
          { time: '1.5s', action: 'Calculating resolution suggestions' },
          { time: '1.8s', action: 'Preparing interactive controls' }
        ]
      };
      updateSession({ messages: [...messages.map(m => m.id === msg.id ? { ...m, isResolved: true } : m), userMsg, triageMsg], isProcessing: false, processingStep: 0 });
    }, 2000);
  };

  const handleLisaWrapUp = (msg, timeLogged = '2.5h', assignee1, assignee2) => {
    const finalAssignee1 = assignee1 || msg.assignee1;
    const finalAssignee2 = assignee2 || msg.assignee2;
    const isManualSubmit = assignee1 && assignee2;
    const promptText = isManualSubmit 
      ? `log ${timeLogged} to ${msg.inProgressTask.TaskId}, assign ${msg.todoTask1.TaskId} to ${finalAssignee1} other ${msg.todoTask2.TaskId} to ${finalAssignee2}`
      : "Auto-assign to team";
    const userMsg = { id: Date.now(), sender: 'user', text: promptText };
    updateSession({ messages: [...messages.map(m => m.id === msg.id ? { ...m, isResolved: true, timeLogged, finalAssignee1, finalAssignee2 } : m), userMsg], isProcessing: true, processingStep: 9 });
    setTimeout(() => {
      const execMsg = {
        ...msg,
        id: Date.now(),
        sender: 'agent',
        text: `Successfully logged ${timeLogged} hours to ${msg.inProgressTask.TaskId} on Lisa's behalf and redistributed her remaining tasks based on current sprint capacity:

${finalAssignee1} and ${finalAssignee2} were assigned ${msg.todoTask1.TaskId} and ${msg.todoTask2.TaskId} due to their light workloads.`,
        isLisaPhase1: false,
        isLisaPhase2: false,
        isLisaPhase3: true,
        assignee1: finalAssignee1,
        assignee2: finalAssignee2,
        timeLogged,
        isManualSubmit,
        prompts: [
          { label: 'Notify Lisa via Slack' },
          { label: 'See all active team workloads' }
        ],
        thoughtSeconds: 3,
        logs: [
          { time: '0.0s', action: 'Initiated auto-reassign protocol' },
          { time: '0.9s', action: 'Matched tasks to team capacity' },
          { time: '1.8s', action: 'Updated task assignees' },
          { time: '2.4s', action: 'Sent notification emails' },
          { time: '2.8s', action: "Cleared Lisa's calendar blockers" }
        ]
      };
      updateSession({ messages: [...messages.map(m => m.id === msg.id ? { ...m, isResolved: true } : m), userMsg, execMsg], isProcessing: false, processingStep: 0 });
      if (onAllTasksCompleted) onAllTasksCompleted();
    }, 3000);
  };

  const renderLisaPhase1Card = (msg) => (
    <div style={{ marginTop: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden', width: '100%', maxWidth: '800px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ borderBottom: '1px solid #e2e8f0', padding: '16px 20px', backgroundColor: '#f8fafc', fontWeight: 600, color: '#1e293b' }}>
        Lisa's Workload Audit
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '16px', fontSize: '0.9rem', color: '#1e293b' }}>
          <strong>Project:</strong> {msg.projectName}
        </div>
        <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
          <strong>Pending Workload:</strong> {msg.lisaTaskCount} tasks (1 in progress with 2.5h unlogged time, 2 unstarted items)
        </div>
        <div style={{ fontWeight: 500, color: '#1e293b', marginBottom: '12px', fontSize: '0.9rem' }}>
          Would you like me to auto-distribute her tasks based on team capacity, or would you prefer to inspect and manually adjust her time logs first?
        </div>
        <div style={{ display: 'flex', gap: '12px', opacity: msg.isResolved ? 0.5 : 1, pointerEvents: msg.isResolved ? 'none' : 'auto' }}>
          <button disabled={msg.isResolved} onClick={() => handleLisaWrapUp(msg, '2.5h')} style={{ padding: '8px 16px', backgroundColor: '#8b5cf6', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Sparkles size={14} color="#ffffff" /> Auto-assign to team</button>
          <button disabled={msg.isResolved} onClick={() => handleInspectLisaDetails(msg)} style={{ padding: '8px 16px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer' }}>Inspect & adjust Lisa's tasks</button>
          <button disabled={msg.isResolved} style={{ padding: '8px 16px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer' }}>Contact Lisa for status update</button>
        </div>
      </div>
    </div>
  );

  const renderLisaPhase2Card = (msg) => (
    <div style={{ marginTop: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden', width: '100%', maxWidth: '800px', fontFamily: 'Inter, sans-serif', opacity: msg.isResolved ? 0.5 : 1, pointerEvents: msg.isResolved ? 'none' : 'auto' }}>
      <div style={{ borderBottom: '1px solid #e2e8f0', padding: '16px 20px', backgroundColor: '#f8fafc', fontWeight: 600, color: '#1e293b' }}>
        Lisa's Task Breakdown & Manual Overrides
      </div>
      <form onSubmit={(e) => { 
        e.preventDefault(); 
        handleLisaWrapUp(msg, e.target.time.value, e.target.assignee1.value, e.target.assignee2.value); 
      }} style={{ padding: '20px' }}>
        <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>Task 1: Unlogged Hours In Progress ({msg.inProgressTask.TaskId})</div>
          <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '4px' }}>Task: {msg.inProgressTask.TaskId} • {msg.inProgressTask.TaskName}</div>
          <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '4px' }}>Status: In Progress</div>
          <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>Suggested Log: 2.5h (Calculated from average completion pace)</div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
             <input name="time" defaultValue={msg.timeLogged || "2.5h"} disabled={msg.isResolved} required style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', width: '80px', backgroundColor: msg.isResolved ? '#f1f5f9' : 'white' }} />
             <span style={{ fontSize: '0.85rem', color: '#64748b' }}>hours logged</span>
          </div>
        </div>
        <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>Task 2: Unstarted Transition Checklist ({msg.todoTask1.TaskId})</div>
          <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '4px' }}>Task: {msg.todoTask1.TaskId} • {msg.todoTask1.TaskName}</div>
          <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>Status: To Do</div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
             <select name="assignee1" defaultValue={msg.finalAssignee1 || msg.assignee1} disabled={msg.isResolved} required style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: msg.isResolved ? '#f1f5f9' : 'white' }}>
               <option value={msg.assignee1}>{msg.assignee1} (15% bandwidth)</option>
               <option value={msg.assignee2}>{msg.assignee2}</option>
               <option value={msg.assignee3}>{msg.assignee3}</option>
             </select>
          </div>
        </div>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>Task 3: Unstarted Knowledge Base ({msg.todoTask2.TaskId})</div>
          <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '4px' }}>Task: {msg.todoTask2.TaskId} • {msg.todoTask2.TaskName}</div>
          <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '16px' }}>Status: To Do</div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
             <select name="assignee2" defaultValue={msg.finalAssignee2 || msg.assignee2} disabled={msg.isResolved} required style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: msg.isResolved ? '#f1f5f9' : 'white' }}>
               <option value={msg.assignee2}>{msg.assignee2} (20% bandwidth)</option>
               <option value={msg.assignee1}>{msg.assignee1}</option>
               <option value={msg.assignee3}>{msg.assignee3}</option>
             </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
           <button disabled={msg.isResolved} type="submit" style={{ padding: '10px 20px', backgroundColor: msg.isResolved ? '#94a3b8' : '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: msg.isResolved ? 'not-allowed' : 'pointer', width: '100%' }}>{msg.isResolved ? 'Submitted' : 'Submit and wrap'}</button>
        </div>
      </form>
    </div>
  );

  const renderLisaPhase3Card = (msg) => (
    <div style={{ marginTop: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden', width: '100%', maxWidth: '800px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ fontWeight: 600, color: '#1e293b' }}>Task Reassignment Matrix (Resolved State)</div>
        <div style={{ backgroundColor: '#d1fae5', color: '#047857', padding: '4px 12px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 600 }}>Status: Reassigned & Dispatched</div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ padding: '12px', fontWeight: 600 }}>Project</th>
              <th style={{ padding: '12px', fontWeight: 600 }}>Task</th>
              <th style={{ padding: '12px', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '12px', fontWeight: 600 }}>Assigned To</th>
              <th style={{ padding: '12px', fontWeight: 600 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '12px' }}>{msg.projectName}</td>
              <td style={{ padding: '12px' }}>{msg.inProgressTask.TaskId} • {msg.inProgressTask.TaskName}</td>
              <td style={{ padding: '12px' }}><span style={{ color: '#10b981' }}>Completed</span></td>
              <td style={{ padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Lisa Allen ({msg.timeLogged} Logged)
                  {msg.isManualSubmit && <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>Manual</span>}
                </div>
              </td>
              <td style={{ padding: '12px' }}>Logged</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '12px' }}>{msg.projectName}</td>
              <td style={{ padding: '12px' }}>{msg.todoTask1.TaskId} • {msg.todoTask1.TaskName}</td>
              <td style={{ padding: '12px' }}><span style={{ color: '#8b5cf6' }}>Reassigned</span></td>
              <td style={{ padding: '12px' }}>{msg.assignee1}</td>
              <td style={{ padding: '12px' }}>Dispatched</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '12px' }}>{msg.projectName}</td>
              <td style={{ padding: '12px' }}>{msg.todoTask2.TaskId} • {msg.todoTask2.TaskName}</td>
              <td style={{ padding: '12px' }}><span style={{ color: '#8b5cf6' }}>Reassigned</span></td>
              <td style={{ padding: '12px' }}>{msg.assignee2}</td>
              <td style={{ padding: '12px' }}>Dispatched</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ padding: '20px', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
        <div style={{ color: '#1e293b', fontSize: '0.9rem', marginBottom: '16px' }}>
          Calendar updates and handoff notifications have been dispatched to {msg.assignee3}, {msg.assignee1}, and {msg.assignee2}. Lisa's workload for this week is now 100% resolved.
        </div>
      </div>
    </div>
  );

  const renderProjectAuditCard = (msg) => {
    const isResolvingAuto = pendingBatchAction && pendingBatchAction.msgId === msg.id && pendingBatchAction.type === 'auto';
    const isResolvedOrResolving = msg.isResolved || isResolvingAuto;
    
    return (
      <>
      <div style={{ marginTop: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden', width: '100%', maxWidth: '800px', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ borderBottom: '1px solid #e2e8f0', padding: '16px 20px', backgroundColor: '#f8fafc', fontWeight: 600, color: '#1e293b' }}>
          Project Closeout Audit
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontWeight: 600, color: '#1e293b' }}>{msg.projectId} • {msg.projectName}</span>
            <span style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>Blocked</span>
          </div>
          <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
          Blocked by {msg.blockerText}
          </div>
          <div style={{ fontWeight: 500, color: '#1e293b', marginBottom: '12px', fontSize: '0.9rem' }}>
            How would you like to handle the blocked items in {msg.projectId} before closeout?
          </div>
          <div style={{ display: 'flex', gap: '12px', opacity: isResolvedOrResolving ? 0.5 : 1, pointerEvents: isResolvedOrResolving ? 'none' : 'auto' }}>
            <button onClick={() => handleAutoResolveComplete(msg)} style={{ padding: '8px 16px', backgroundColor: '#8b5cf6', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Sparkles size={14} color="#ffffff" /> {isResolvingAuto ? 'Resolving...' : 'Auto-resolve blockers & complete'}</button>
            <button onClick={() => handleInspectDetails(msg)} style={{ padding: '8px 16px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer' }}>Inspect PRJ-005 details</button>
          </div>
        </div>
      </div>
      </>
    );
  };

  const renderPhase2Card = (msg) => {
    const isResolvingManual = pendingBatchAction && pendingBatchAction.msgId === msg.id && pendingBatchAction.type === 'manual';
    const isResolvedOrResolving = msg.isResolved || isResolvingManual;

    return (
      <div style={{ marginTop: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden', width: '100%', maxWidth: '900px', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ borderBottom: '1px solid #e2e8f0', padding: '16px 20px', backgroundColor: '#f8fafc', fontWeight: 600, color: '#1e293b' }}>
          Conflict Matrix (Triage Flow)
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Task Path</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Level</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Blocker</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* L1 */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '20px' }}>
                  <Folder size={16} color="#475569" />
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>PRJ-005 • Bowen-Chapman - Enterprise Rollout</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>L1 Project</span>
                </td>
                <td style={{ padding: '16px 20px', color: '#64748b' }}>Project status locked<br/>(L2 Blocked)</td>
                <td style={{ padding: '16px 20px', color: '#f59e0b', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={16} /> Blocked
                </td>
              </tr>
              {/* L2 */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '32px' }}>
                  <CornerDownRight size={16} color="#94a3b8" />
                  <Folder size={16} color="#64748b" />
                  <span style={{ color: '#1e293b' }}>MST-021 • Implementation</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>L2 Milestone</span>
                </td>
                <td style={{ padding: '16px 20px', color: '#64748b' }}>Rollout tasks pending<br/>(L3 Blocked)</td>
                <td style={{ padding: '16px 20px', color: '#f59e0b', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={16} /> Blocked
                </td>
              </tr>
              {/* L3 */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '44px' }}>
                  <CornerDownRight size={16} color="#94a3b8" />
                  <Circle size={16} color="#3b82f6" />
                  <span style={{ color: '#1e293b' }}>TSK-0003 • Hypercare</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>L3 Subtask</span>
                </td>
                <td style={{ padding: '16px 20px', color: '#64748b' }}>Incomplete predecessor<br/>(TSK-0004)</td>
                <td style={{ padding: '16px 20px', color: '#f59e0b', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={16} /> Blocked
                </td>
              </tr>
              {/* L4 */}
              <tr style={{ backgroundColor: '#fef2f2' }}>
                <td style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '56px' }}>
                  <Ban size={20} color="#ef4444" />
                  <span style={{ color: '#ef4444', fontWeight: 600 }}>TSK-0004 • Starter Kit Walkthrough</span>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ backgroundColor: '#fecaca', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#991b1b' }}>L4 Root Cause</span>
                </td>
                <td style={{ padding: '20px 24px', color: '#ef4444', fontWeight: 500 }}>Violation: 0.00h logged</td>
                <td style={{ padding: '20px 24px' }}>
                  <form onSubmit={(e) => { 
                    e.preventDefault(); 
                    const val = e.target.time.value;
                    handleOverrideExecution(msg, val, 'Time logged'); 
                  }} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                     <input 
                       name="time" 
                       placeholder="HH:MM" 
                       required 
                       pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
                       defaultValue={msg.timeLogged || ""}
                       disabled={isResolvedOrResolving}
                       onInvalid={(e) => {
                         if (e.target.validity.valueMissing) {
                           e.target.setCustomValidity('Please fill out this feild');
                         } else {
                           e.target.setCustomValidity('Please enter the time in HH:MM format example: 03:30');
                         }
                       }}
                       onInput={(e) => e.target.setCustomValidity('')}
                       style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #d1d5db', width: '70px', fontSize: '0.85rem', backgroundColor: isResolvedOrResolving ? '#f1f5f9' : 'white', cursor: isResolvedOrResolving ? 'not-allowed' : 'text' }} 
                     />
                     <button type="submit" disabled={isResolvedOrResolving} style={{ padding: '6px 12px', backgroundColor: msg.isResolved ? '#94a3b8' : (isResolvingManual ? '#f59e0b' : '#10b981'), color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: isResolvedOrResolving ? 'not-allowed' : 'pointer', fontSize: '0.85rem' }}>{msg.isResolved ? 'Resolved' : (isResolvingManual ? 'Resolving...' : 'Resolve')}</button>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderPhase3Card = (msg) => {
    return (
      <div style={{ marginTop: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden', width: '100%', maxWidth: '900px', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ borderBottom: '1px solid #e2e8f0', padding: '16px 20px', backgroundColor: '#f8fafc', fontWeight: 600, color: '#1e293b' }}>
          Conflict Matrix (Triage flow)
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Blocked Entity</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Level</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Blocker Reason</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* L1 */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span style={{ color: '#1e293b' }}>PRJ-005 • Bowen-Chapman - Enterprise Rollout</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>L1 Project</span>
                </td>
                <td style={{ padding: '16px 20px', color: '#64748b' }}>Open milestone task (TSK-0002)</td>
                <td style={{ padding: '16px 20px', color: '#10b981', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={16} /> Resolved
                </td>
              </tr>
              {/* L2 */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '32px' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span style={{ color: '#1e293b' }}>TSK-0002 • Functional configuration</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>L2 Milestone</span>
                </td>
                <td style={{ padding: '16px 20px', color: '#64748b' }}>Uncompleted subtask (TSK-0003)</td>
                <td style={{ padding: '16px 20px', color: '#10b981', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={16} /> Resolved
                </td>
              </tr>
              {/* L3 */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '44px' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span style={{ color: '#1e293b' }}>TSK-0003 • Hypercare</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>L3 Subtask</span>
                </td>
                <td style={{ padding: '16px 20px', color: '#64748b' }}>Incomplete predecessor (TSK-0004)</td>
                <td style={{ padding: '16px 20px', color: '#10b981', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={16} /> Resolved
                </td>
              </tr>
              {/* L4 */}
              <tr style={{ backgroundColor: '#ecfdf5' }}>
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '56px' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span style={{ color: '#047857', fontWeight: 600 }}>TSK-0004 • Starter Kit Walkthrough</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ backgroundColor: '#d1fae5', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#047857' }}>L4 Root Cause</span>
                </td>
                <td style={{ padding: '16px 20px', color: '#10b981', fontWeight: 500 }}>Resolved: Time logged</td>
                <td style={{ padding: '16px 20px', color: '#10b981', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={16} /> Resolved
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderPhase4Card = (msg) => {
    return (
      <div style={{ marginTop: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden', width: '100%', maxWidth: '800px', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ borderBottom: '1px solid #e2e8f0', padding: '16px 20px', backgroundColor: '#f8fafc', fontWeight: 600, color: '#1e293b' }}>
          Project Status — Complete
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ backgroundColor: '#10b981', color: 'white', padding: '4px 12px', borderRadius: '16px', fontSize: '0.85rem', fontWeight: 600 }}>Project Archived & Locked</span>
          </div>
          <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>
            Summary Metrics: 1 Project Archived • {msg.timeLogged || '4.0h'} Total Hours Logged • 1 Admin Override Audited
          </div>
          <div style={{ fontWeight: 500, color: '#1e293b', marginBottom: '12px', fontSize: '0.9rem' }}>
            Proactive Next-Step Suggestions:
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ padding: '6px 12px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>Export Closeout Audit (PDF)</button>
            <button style={{ padding: '6px 12px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>Start Q4 Portfolio Planning</button>
          </div>
        </div>
      </div>
    );
  };


  const renderReassignmentCard = (msg) => {
    const isResolved = msg.isReassignmentResolved;
    const showAssignee = isResolved === 'auto' || isResolved === 'manual_done';
    
    let statusText = "Status: 3 Pending Tasks";
    if (isResolved === 'auto') statusText = "Status: Reassigned & Dispatched";
    if (isResolved === 'manual_done') statusText = "Status: Manually Reassigned";

    return (
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden', width: '100%', maxWidth: '750px', marginTop: '16px', fontFamily: '"Inter", sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 600, color: '#334155' }}>Task Reassignment Matrix</span>
          </div>
          <div style={{ backgroundColor: showAssignee ? '#d1fae5' : '#fef3c7', color: showAssignee ? '#047857' : '#d97706', padding: '4px 12px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: 600 }}>
            {statusText}
          </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px', fontWeight: 600 }}>Project</th>
                <th style={{ padding: '12px', fontWeight: 600 }}>Task</th>
                <th style={{ padding: '12px', fontWeight: 600 }}>Status</th>
                {showAssignee && <th style={{ padding: '12px', fontWeight: 600 }}>Assigned To</th>}
                {showAssignee && <th style={{ padding: '12px', fontWeight: 600 }}>Action</th>}
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'TSK-0217', name: 'Functional configuration', project: 'P1 Platform Deployment', status: 'In progress', color: '#3b82f6', assignee: 'Diane Evans', manualAssignee: 'Susan Serrano' },
                { id: 'TSK-0218', name: 'Update CS Transition Checklist', project: 'P1 Platform Deployment', status: 'To do', color: '#8b5cf6', assignee: 'Cameron Fisher', manualAssignee: 'Anthony Harmon' },
                { id: 'TSK-0219', name: 'Update CS Knowledge Repository', project: 'P1 Platform Deployment', status: 'To do', color: '#8b5cf6', assignee: 'April Frost', manualAssignee: 'Anthony Harmon' }
              ].map((t, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', backgroundColor: showAssignee ? '#f8fafc' : '#ffffff' }}>
                  <td style={{ padding: '16px 12px', color: '#475569', fontWeight: 500 }}>
                    {t.project}
                  </td>
                  <td style={{ padding: '16px 12px', fontWeight: 500, color: '#1e293b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Folder size={14} color="#64748b" /> {t.id} • {t.name}
                    </div>
                  </td>
                  <td style={{ padding: '16px 12px' }}>
                    <span style={{ color: t.color, fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Circle size={14}/> {t.status}
                    </span>
                  </td>
                  {showAssignee && (
                    <td style={{ padding: '16px 12px', color: '#10b981', fontWeight: 600 }}>
                      {isResolved === 'manual_done' ? t.manualAssignee : t.assignee}
                    </td>
                  )}
                  {showAssignee && (
                    <td style={{ padding: '16px 12px' }}>
                      <span style={{ color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={14}/> Reassigned</span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: '#f8fafc', position: 'relative' }}>
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '750px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map(msg => {
          return (
          <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '100%', marginBottom: '8px', width: '100%' }}>
            {msg.sender === 'system' ? (
              msg.isStopped ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', padding: '16px 0', margin: '8px 0' }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                  <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>{msg.text}</div>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }}></div>
                </div>
              ) : (
                <div style={{ alignSelf: 'center', backgroundColor: '#f1f5f9', color: '#64748b', padding: '8px 16px', borderRadius: '16px', fontSize: '0.85rem', marginBottom: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                  {msg.text}
                </div>
              )
            ) : msg.sender === 'user' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', maxWidth: '60%' }}>
                <div style={{ backgroundColor: '#f1f5f9', color: '#334155', padding: '16px', borderRadius: '24px 24px 4px 24px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', fontSize: '0.95rem', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                  {msg.text}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px', marginRight: '4px' }}>
                  <button 
                    onClick={() => setInputValue(msg.text)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#64748b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    title="Edit message"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button 
                    onClick={() => navigator.clipboard.writeText(msg.text)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '4px', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#64748b'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                    title="Copy text"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ maxWidth: '85%' }}>
                <div style={{ color: '#1e293b', padding: '8px 0', fontSize: '0.95rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                  {msg.thoughtSeconds && (
                    <ThoughtBadge seconds={msg.thoughtSeconds} logs={msg.logs} />
                  )}
                  {msg.text}
                </div>
                
              </div>
            )}
            {msg.isProjectAudit && renderProjectAuditCard(msg)}
            {msg.isLisaPhase1 && renderLisaPhase1Card(msg)}
            {msg.isLisaPhase2 && renderLisaPhase2Card(msg)}
            {msg.isLisaPhase3 && renderLisaPhase3Card(msg)}
            {msg.isPhase2 && renderPhase2Card(msg)}
            {msg.isPhase3 && renderPhase3Card(msg)}
            {msg.isPhase4 && renderPhase4Card(msg)}
            {msg.isReassignmentFlow && renderReassignmentCard(msg)}
            {msg.sender !== 'user' && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px', marginLeft: '4px' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1', padding: '4px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#94a3b8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'} title="Good response"><ThumbsUp size={16} /></button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1', padding: '4px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#94a3b8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'} title="Bad response"><ThumbsDown size={16} /></button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1', padding: '4px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#94a3b8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'} title="Regenerate"><RotateCcw size={16} /></button>
                </div>
            )}
            {msg.showSurvey && <MicroSurvey />}
            {msg.prompts && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
                {msg.prompts.map((p, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSend(p.label)}
                    style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', color: '#475569', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )})}
        {isProcessing && processingStep > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#6366f1', fontSize: '0.9rem', fontWeight: 500, padding: '16px 20px', backgroundColor: 'white', border: '1px solid #e0e7ff', borderRadius: '12px 12px 12px 4px', width: 'fit-content', boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.1)' }}>
            <Sparkles size={18} className="spin-animation" />
            {getProcessingText()}
          </div>
        )}
        {isProcessing && (!processingStep || processingStep === 0) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.85rem', padding: '16px', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '12px 12px 12px 4px', width: 'fit-content' }}>
            <div className="typing-dot" style={{ animationDelay: '0s' }}></div><div className="typing-dot" style={{ animationDelay: '0.2s' }}></div><div className="typing-dot" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
        </div>
      </div>
      {pendingBatchAction && (
        <UndoToast 
          text={pendingBatchAction.text} 
          onUndo={() => {
            setPendingBatchAction(null);
          }} 
          onCommit={() => {
            const { type, msg, newTime, reason } = pendingBatchAction;
            setPendingBatchAction(null);
            if (type === 'auto') {
              commitAutoResolveComplete(msg);
            } else if (type === 'manual') {
              commitOverrideExecution(msg, newTime, reason);
            }
          }}
        />
      )}
      {(messages.length > 0 || isProcessing) && (
        <div style={{ padding: '24px', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: '24px', padding: '8px 16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', width: '100%', maxWidth: '750px' }}>
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && !isProcessing && handleSend()} placeholder="Ask the project governance agent" style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '0.95rem', color: '#1e293b', padding: '8px' }} />
            {isProcessing ? (
              <div style={{ position: 'relative', width: '36px', height: '36px' }}>
                <button onClick={handleStop} style={{ position: 'absolute', top: '4px', left: '4px', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#000000', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}>
                  <Square size={12} fill="white" />
                </button>
              </div>
            ) : (
              <button onClick={() => handleSend()} disabled={!inputValue.trim()} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: inputValue.trim() ? '#3b82f6' : '#cbd5e1', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: inputValue.trim() ? 'pointer' : 'default', transition: 'background-color 0.2s' }}>
                <Send size={16} style={{ marginLeft: '2px' }} />
              </button>
            )}
          </div>
        </div>
      )}
      <style>{`
        .typing-dot { width: 6px; height: 6px; background-color: #cbd5e1; border-radius: 50%; animation: typing 1.4s infinite ease-in-out both; }
        @keyframes typing { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
        .spin-animation { animation: spin 2s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default GovernanceAgent;
