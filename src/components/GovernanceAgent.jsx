import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle2, ArrowRight, CornerDownRight, Folder, AlertCircle, Sparkles, Circle, Ban, ChevronRight as ChevronRightIcon, ThumbsUp, ThumbsDown, RotateCcw, Edit2, Copy, Square, ShieldCheck, AlertTriangle, Clock, Link2, Layers, Zap } from 'lucide-react';
import { auditPortfolio, auditResourceWorkload, auditPortfolioCompliance } from '../utils/conflictEngine';

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

const PLACEHOLDERS = [
  "Try: Mark all the projects completed",
  "Try: Wrap lisa's work with in end of the week",
  "Try: Check portfolio compliance"
];

const GovernanceAgent = ({ 
  initialQuery, 
  setInitialQuery, 
  _project, 
  projects = [], 
  tasks = [], 
  session, 
  updateSession, 
  onTasksCompleted, 
  onAllTasksCompleted, 
  onAllProjectsCompleted,
  onTasksReassigned,
  setActiveTab
}) => {
  const [inputValue, setInputValue] = useState('');
  const [pendingBatchAction, setPendingBatchAction] = useState(null);
  
  const messagesEndRef = useRef(null);
  const activeTimeoutsRef = useRef(new Set());
  const handleSendRef = useRef(null);

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

  const { messages, isProcessing, processingStep } = session || { messages: [], isProcessing: false, processingStep: 0 };

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    if (messages.length > 0) return;
    
    const fullText = PLACEHOLDERS[placeholderIndex];
    if (isDeleting) {
      if (currentPlaceholder.length === 0) {
        setIsDeleting(false);
        setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
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
  }, [messages, isProcessing, processingStep]);

  useEffect(() => {
    if (initialQuery) {
      handleSendRef.current?.(initialQuery);
      if (setInitialQuery) setInitialQuery('');
    }
  }, [initialQuery, setInitialQuery]);

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;
    
    const userMsg = { id: Date.now(), sender: 'user', text: text };
    const newMessages = messages.map(m => m.prompts ? { ...m, prompts: null } : m).concat(userMsg);
    
    updateSession({ title: messages.length === 0 ? text : session.title, messages: newMessages, isProcessing: true, processingStep: 1 });
    setInputValue('');

    const textLower = text.toLowerCase();

    // 1. Navigation Shortcut: "See all Projects"
    if (textLower.includes('see all projects')) {
      updateSession({ isProcessing: false, processingStep: 0 });
      if (setActiveTab) setActiveTab('project_list');
      return;
    }

    // 2. Integration Fallback: "Notify Lisa via Slack"
    if (textLower.includes('notify lisa via slack') || textLower.includes('slack')) {
      setAgentTimeout(() => updateSession({ processingStep: 20 }), 1200);
      setAgentTimeout(() => {
        const slackMsg = { 
          id: Date.now(), 
          sender: 'agent', 
          text: `Slack integration isn't available yet in your workspace settings, so notifications can't be sent automatically.\nEnable Slack integration in Workspace Settings first, then retry.`,
          thoughtSeconds: 3,
          logs: [
            { time: '0.0s', action: 'Contacting Slack API gateway' },
            { time: '1.2s', action: 'Checking workspace OAuth credentials' },
            { time: '2.5s', action: 'Missing active Slack connection; returned safe fallback' }
          ],
          prompts: [
            { label: 'See all Projects' },
            { label: 'Mark all the projects completed' }
          ]
        };
        updateSession({ messages: [...newMessages, slackMsg], isProcessing: false, processingStep: 0 });
      }, 2500);
      return;
    }

    // 3. Portfolio Compliance & Governance Health Query
    if (textLower.includes('compliance') || textLower.includes('health') || (textLower.includes('audit') && !textLower.includes('closeout') && !textLower.includes('prj')) || textLower.includes('risk overview') || textLower.includes('governance report') || textLower.includes('status report')) {
      const comp = auditPortfolioCompliance(projects, tasks);

      setAgentTimeout(() => updateSession({ processingStep: 2 }), 1000);
      setAgentTimeout(() => updateSession({ processingStep: 3 }), 1800);

      setAgentTimeout(() => {
        const complianceMsg = {
          id: Date.now(),
          sender: 'agent',
          text: `I completed a portfolio-wide compliance audit across all ${comp.totalProjects} projects (${comp.totalTasks} tasks).\n\nOverall portfolio governance score: ${comp.complianceScore}% compliant. ${comp.compliantProjects} projects are operating normally, with ${comp.blockedProjects} project (${comp.blockedProject ? comp.blockedProject.id : 'PRJ-005'}) requiring governance intervention before closeout.`,
          isComplianceCard: true,
          compliance: comp,
          thoughtSeconds: 3,
          logs: [
            { time: '0.0s', action: `Evaluated ${comp.totalProjects} projects against 4 core governance policies` },
            { time: '0.8s', action: `Scanned ${comp.openMilestonesCount} open milestones & ${comp.dependenciesCount} dependency links` },
            { time: '1.6s', action: `Identified ${comp.unloggedCount} active tasks with unlogged hours (Policy 4)` },
            { time: '2.4s', action: `Isolated 1 gating policy cascade on PRJ-005 & 1 resource bottleneck on Lisa Allen` },
            { time: '3.0s', action: `Calculated aggregate compliance index: ${comp.complianceScore}%` }
          ],
          prompts: [
            { 
              label: 'Run Closeout Audit on PRJ-005', 
              query: 'Mark all the projects completed', 
              isPrimary: true, 
              icon: 'sparkles' 
            },
            { 
              label: 'Rebalance Team Workloads', 
              query: "Wrap lisa's work with in end of the week", 
              icon: 'zap' 
            },
            { 
              label: 'See all Projects', 
              action: 'navigate_projects', 
              icon: 'folder' 
            }
          ]
        };
        updateSession({ messages: [...newMessages, complianceMsg], isProcessing: false, processingStep: 0 });
      }, 2600);
      return;
    }

    // 4. Project Closeout Flow: "Mark all the projects completed"
    if (textLower.includes('mark all') || textLower.includes('complete') || textLower.includes('close') || textLower.includes('finish') || textLower.includes('resolve')) {
      const audit = auditPortfolio(projects, tasks);

      if (audit.isAllClosed) {
        setAgentTimeout(() => updateSession({ processingStep: 16 }), 1000);
        setAgentTimeout(() => {
          const allDoneMsg = {
            id: Date.now(),
            sender: 'agent',
            text: 'All projects across your portfolio are already completed and archived. There are no active blockers remaining.',
            thoughtSeconds: 2,
            logs: [
              { time: '0.0s', action: 'Audited portfolio database' },
              { time: '1.2s', action: 'Verified project and task statuses' },
              { time: '2.0s', action: 'Confirmed 0 active blockers across all projects' }
            ],
            prompts: [
              { label: "Try: Wrap lisa's work with in end of the week" },
              { label: 'See all Projects' }
            ]
          };
          updateSession({ messages: [...newMessages, allDoneMsg], isProcessing: false, processingStep: 0 });
        }, 2000);
        return;
      }

      // Step 2 & 3: Audit active blockers
      setAgentTimeout(() => updateSession({ processingStep: 2 }), 1000);
      setAgentTimeout(() => updateSession({ processingStep: 3 }), 2000);

      setAgentTimeout(() => {
        const bp = audit.primaryBlockedProject;

        const auditMsg = {
          id: Date.now(),
          sender: 'agent',
          text: `I completed a portfolio-wide governance triage across all ${audit.totalProjects} projects (${tasks.length} tasks).\n\n30 projects are ready for closeout, but ${bp.projectId} (${bp.projectName}) has an active governance policy blocker holding the portfolio. Rather than requiring manual navigation through 210 unlogged tasks and 48 dependencies across separate boards, Orbito has isolated the root cause below:`,
          isProjectAudit: true,
          projectId: bp.projectId,
          projectName: bp.projectName,
          blockerText: bp.blockerText,
          chain: bp.chain,
          totalProjects: audit.totalProjects,
          totalTasks: tasks.length,
          unloggedCount: audit.unloggedCount || 210,
          dependenciesCount: audit.dependenciesCount || 48,
          openMilestonesCount: audit.openMilestonesCount || 6,
          subtasksCount: audit.subtasksCount || 39,
          thoughtSeconds: 3,
          logs: [
            { time: '0.0s', action: `Audited ${audit.totalProjects} projects across portfolio` },
            { time: '0.8s', action: `Evaluated ${audit.unloggedCount || 210} unlogged tasks & ${audit.dependenciesCount || 48} dependencies` },
            { time: '1.8s', action: 'Verified 30 projects have zero gating policy violations' },
            { time: '2.5s', action: `Isolated gating root cause on ${bp.projectId} (TSK-0004: 0.00h logged)` },
            { time: '3.0s', action: 'Paused batch closeout; awaiting user resolution' }
          ]
        };
        updateSession({ messages: [...newMessages, auditMsg], isProcessing: false, processingStep: 0 });
      }, 3000);
      return;
    }

    // 4. Resource Workload Rebalancing: "Wrap Lisa's work within this week"
    if (textLower.includes('lisa')) {
      setAgentTimeout(() => updateSession({ processingStep: 7 }), 1200);
      setAgentTimeout(() => updateSession({ processingStep: 8 }), 2200);

      setAgentTimeout(() => {
        const workload = auditResourceWorkload(projects, tasks, 'Lisa');
        if (!workload) {
          const noTasksMsg = { id: Date.now(), sender: 'agent', text: "Lisa has no active or uncompleted tasks scheduled." };
          updateSession({ messages: [...newMessages, noTasksMsg], isProcessing: false, processingStep: 0 });
          return;
        }

        const agentMsg = {
          id: Date.now(),
          sender: 'agent',
          text: `I audited Lisa Allen's current workload. She is active on ${workload.projectName} (${workload.projectId}) with ${workload.lisaTaskCount} pending tasks scheduled for this week.`,
          isLisaPhase1: true,
          workload: workload,
          projectId: workload.projectId,
          projectName: workload.projectName,
          inProgressTask: workload.inProgressTask,
          todoTask1: workload.todoTask1,
          todoTask2: workload.todoTask2,
          assignee1: workload.assignee1,
          assignee2: workload.assignee2,
          assignee3: workload.assignee3,
          lisaTaskCount: workload.lisaTaskCount,
          thoughtSeconds: 3,
          logs: [
            { time: '0.0s', action: "Initiated workload wrap-up sequence for Lisa Allen" },
            { time: '1.2s', action: "Scanned active projects for task assignments" },
            { time: '2.2s', action: `Found 3 open tasks on ${workload.projectId}` },
            { time: '3.0s', action: "Generated capacity-aware team distribution suggestions" }
          ]
        };
        updateSession({ messages: [...newMessages, agentMsg], isProcessing: false, processingStep: 0 });
      }, 3200);
      return;
    }

    // Default conversational helper
    setAgentTimeout(() => {
      const defaultMsg = { 
        id: Date.now(), 
        sender: 'agent', 
        text: 'I am specifically trained for this demo to handle project completion and governance policies. Try saying "Mark all my projects completed" or "Wrap up lisa\'s work before the end of the week".' 
      };
      updateSession({ messages: [...newMessages, defaultMsg], isProcessing: false, processingStep: 0 });
    }, 1200);
  };

  handleSendRef.current = handleSend;

  // Branch A: Inspect Details
  const handleInspectDetails = (msg) => {
    const userMsg = { id: Date.now(), sender: 'user', text: `Inspect ${msg.projectId} details` };
    updateSession({ 
      messages: [...messages.map(m => m.id === msg.id ? { ...m, isResolved: true } : m), userMsg], 
      isProcessing: true, 
      processingStep: 2 
    });

    setAgentTimeout(() => updateSession({ processingStep: 3 }), 1500);

    setAgentTimeout(() => {
      const inspectMsg = {
        ...msg,
        id: Date.now(),
        sender: 'agent',
        text: `Here is the full 4-level cascading dependency chain for ${msg.projectId}. Resolving the root cause at Level 4 will unblock the milestone and allow project closeout.`,
        isProjectAudit: false,
        isPhase2: true,
        thoughtSeconds: 3,
        logs: [
          { time: '0.0s', action: `Accessing ${msg.projectId} dependency tree` },
          { time: '1.2s', action: 'Traversing L1 Project -> L2 Milestone -> L3 Subtask' },
          { time: '2.5s', action: 'Pinpointed Level 4 root cause: TSK-0004 with 0.00h logged' }
        ]
      };
      updateSession({ 
        messages: [...messages.map(m => m.id === msg.id ? { ...m, isResolved: true } : m), userMsg, inspectMsg], 
        isProcessing: false, 
        processingStep: 0 
      });
    }, 3000);
  };

  // Manual Override Execution with 5-second Undo safety banner
  const handleOverrideExecution = (msg, newTime, reason = 'Time logged') => {
    setPendingBatchAction({
      type: 'manual_override',
      msg,
      newTime,
      reason,
      text: `Resolving ${msg.chain.l4.id} with ${newTime} and closing portfolio in 5s...`
    });
  };

  const commitManualOverride = (msg, newTime) => {
    updateSession({ isProcessing: true, processingStep: 4 });
    setAgentTimeout(() => updateSession({ processingStep: 5 }), 1200);
    setAgentTimeout(() => updateSession({ processingStep: 6 }), 2400);

    setAgentTimeout(() => {
      // Complete tasks and entire portfolio in global state
      if (onTasksCompleted) onTasksCompleted([msg.chain.l4.id, msg.chain.l3.id, msg.chain.l2.id]);
      if (onAllTasksCompleted) onAllTasksCompleted();
      if (onAllProjectsCompleted) onAllProjectsCompleted();

      const resolvedMsg = {
        ...msg,
        id: Date.now(),
        sender: 'agent',
        text: `Successfully logged ${newTime} to "${msg.chain.l4.id}". Cascade triggered!\n✓ "${msg.chain.l4.id}" completed.\n✓ "${msg.chain.l3.id}" completed.\n✓ "${msg.chain.l2.id}" milestone completed.\n✓ Project "${msg.projectId}" unblocked and completed.\n\nWith all portfolio blockers cleared, all ${msg.totalProjects || 31} projects have now been successfully closed out.`,
        isPhase2: false,
        isPhase3: true,
        timeLogged: newTime,
        showSurvey: true,
        thoughtSeconds: 3,
        logs: [
          { time: '0.0s', action: `Logged ${newTime} to ${msg.chain.l4.id}` },
          { time: '0.8s', action: 'Cascaded status completion up dependency chain (Policy 4 -> 3 -> 2 -> 1)' },
          { time: '1.8s', action: `Cleared milestone ${msg.chain.l2.id} on ${msg.projectId}` },
          { time: '2.8s', action: `Unblocked batch closeout; archived all ${msg.totalProjects || 31} portfolio projects` }
        ],
        prompts: [
          { label: 'See all Projects' },
          { label: "Try: Wrap lisa's work with in end of the week" }
        ]
      };

      updateSession({
        messages: [...messages.map(m => m.id === msg.id ? { ...m, isResolved: true } : m), resolvedMsg],
        isProcessing: false,
        processingStep: 0
      });
    }, 3600);
  };

  // Branch B: One-Click Autonomous Auto-Resolve with 5-second Undo safety banner
  const handleAutoResolveComplete = (msg) => {
    setPendingBatchAction({
      type: 'auto_resolve',
      msg,
      text: 'Auto-resolving blockers and closing portfolio in 5s...'
    });
  };

  const commitAutoResolveComplete = (msg) => {
    updateSession({ isProcessing: true, processingStep: 12 });
    setAgentTimeout(() => updateSession({ processingStep: 13 }), 1200);
    setAgentTimeout(() => updateSession({ processingStep: 14 }), 2400);
    setAgentTimeout(() => updateSession({ processingStep: 15 }), 3400);

    setAgentTimeout(() => {
      // Complete in global state
      if (onTasksCompleted) onTasksCompleted([msg.chain.l4.id, msg.chain.l3.id, msg.chain.l2.id]);
      if (onAllTasksCompleted) onAllTasksCompleted();
      if (onAllProjectsCompleted) onAllProjectsCompleted();

      const autoResolvedMsg = {
        ...msg,
        id: Date.now(),
        sender: 'agent',
        text: `I auto-logged the historical average time (02:30) to ${msg.chain.l4.id}, cleared the cascading dependency chain on ${msg.projectId}, and successfully completed closeout across all ${msg.totalProjects || 31} projects.`,
        isProjectAudit: false,
        isPhase3: true,
        timeLogged: '02:30',
        showSurvey: true,
        thoughtSeconds: 4,
        logs: [
          { time: '0.0s', action: `Initiated autonomous resolution for ${msg.projectId}` },
          { time: '1.2s', action: `Calculated historical logging average for ${msg.chain.l4.id} (02:30)` },
          { time: '2.2s', action: `Auto-logged 02:30 to ${msg.chain.l4.id} (Policy 4 satisfied)` },
          { time: '3.2s', action: `Cascaded resolution: L4 -> L3 -> L2 -> L1 on ${msg.projectId}` },
          { time: '4.0s', action: `Cleared final blocker; archived all ${msg.totalProjects || 31} projects across portfolio` }
        ],
        prompts: [
          { label: 'See all Projects' },
          { label: "Try: Wrap lisa's work with in end of the week" }
        ]
      };

      updateSession({
        messages: [...messages.map(m => m.id === msg.id ? { ...m, isResolved: true } : m), autoResolvedMsg],
        isProcessing: false,
        processingStep: 0
      });
    }, 4500);
  };

  // Lisa Flow: Option B - Inspect & Adjust Details
  const handleInspectLisaDetails = (msg) => {
    const userMsg = { id: Date.now(), sender: 'user', text: "Inspect & adjust Lisa's tasks" };
    updateSession({ 
      messages: [...messages.map(m => m.id === msg.id ? { ...m, isResolved: true } : m), userMsg], 
      isProcessing: true, 
      processingStep: 9 
    });

    setAgentTimeout(() => {
      const triageMsg = {
        ...msg,
        id: Date.now(),
        sender: 'agent',
        text: `Here is the breakdown of Lisa's pending tasks on ${msg.projectName}. You can adjust logged hours or reassign to available team members:`,
        isLisaPhase1: false,
        isLisaPhase2: true,
        thoughtSeconds: 2,
        logs: [
          { time: '0.0s', action: 'Accessed task details on ' + msg.projectId },
          { time: '1.0s', action: 'Calculated sprint bandwidth for team members' },
          { time: '1.8s', action: 'Prepared interactive override forms' }
        ]
      };
      updateSession({ 
        messages: [...messages.map(m => m.id === msg.id ? { ...m, isResolved: true } : m), userMsg, triageMsg], 
        isProcessing: false, 
        processingStep: 0 
      });
    }, 2000);
  };

  // Lisa Flow: Commit Reassignments
  const handleLisaWrapUp = (msg, timeLogged = '2.5h', assignee1, assignee2) => {
    const finalAssignee1 = assignee1 || msg.assignee1;
    const finalAssignee2 = assignee2 || msg.assignee2;
    const isManual = Boolean(assignee1 && assignee2);

    setPendingBatchAction({
      type: 'lisa_wrap',
      msg,
      timeLogged,
      finalAssignee1,
      finalAssignee2,
      isManual,
      text: "Reassigning Lisa's workload and dispatching calendar updates in 5s..."
    });
  };

  const commitLisaWrapUp = (msg, timeLogged, finalAssignee1, finalAssignee2, isManual) => {
    const promptText = isManual
      ? `log ${timeLogged} to ${msg.inProgressTask.TaskId}, assign ${msg.todoTask1.TaskId} to ${finalAssignee1} and ${msg.todoTask2.TaskId} to ${finalAssignee2}`
      : "Auto-assign to team";

    const userMsg = { id: Date.now(), sender: 'user', text: promptText };
    updateSession({ 
      messages: [...messages.map(m => m.id === msg.id ? { ...m, isResolved: true } : m), userMsg], 
      isProcessing: true, 
      processingStep: 10 
    });

    setAgentTimeout(() => updateSession({ processingStep: 11 }), 1200);

    setAgentTimeout(() => {
      // Actually mutate tasks in App.jsx via onTasksReassigned callback!
      if (onTasksReassigned) {
        onTasksReassigned([
          { taskId: msg.inProgressTask.TaskId, assignee: 'Lisa Allen', hoursTracked: timeLogged, status: 'Completed' },
          { taskId: msg.todoTask1.TaskId, assignee: finalAssignee1, status: 'To do' },
          { taskId: msg.todoTask2.TaskId, assignee: finalAssignee2, status: 'To do' }
        ]);
      }

      const execMsg = {
        ...msg,
        id: Date.now(),
        sender: 'agent',
        text: `Successfully logged ${timeLogged} to ${msg.inProgressTask.TaskId} on Lisa's behalf and redistributed her remaining tasks based on current sprint capacity:\n\n• ${finalAssignee1} and ${finalAssignee2} were assigned ${msg.todoTask1.TaskId} and ${msg.todoTask2.TaskId} due to their light workloads.\n\nLisa's week is now wrapped up!`,
        isLisaPhase1: false,
        isLisaPhase2: false,
        isLisaPhase3: true,
        assignee1: finalAssignee1,
        assignee2: finalAssignee2,
        timeLogged,
        isManualSubmit: isManual,
        prompts: [
          { label: 'Notify Lisa via Slack' },
          { label: 'See all Projects' }
        ],
        thoughtSeconds: 3,
        logs: [
          { time: '0.0s', action: 'Initiated auto-reassign protocol' },
          { time: '0.9s', action: 'Matched tasks to team capacity' },
          { time: '1.8s', action: 'Updated task assignees in database' },
          { time: '2.4s', action: 'Sent notification emails to ' + finalAssignee1 + ' and ' + finalAssignee2 },
          { time: '3.0s', action: "Cleared Lisa's calendar blockers" }
        ]
      };

      updateSession({ 
        messages: [...messages.map(m => m.id === msg.id ? { ...m, isResolved: true } : m), userMsg, execMsg], 
        isProcessing: false, 
        processingStep: 0 
      });
    }, 2800);
  };

  const getProcessingText = () => {
    if (processingStep === 1) return "Auditing portfolio projects...";
    if (processingStep === 2) return "Investigating phases and milestones...";
    if (processingStep === 3) return "Checking timesheet policies and dependencies...";
    if (processingStep === 4) return "Logging time override...";
    if (processingStep === 5) return "Validating timesheet compliance...";
    if (processingStep === 6) return "Triggering completion cascade...";
    if (processingStep === 7) return "Scanning active projects for Lisa's assignments...";
    if (processingStep === 8) return "Analyzing sprint capacity and deadlines...";
    if (processingStep === 9) return "Preparing workload rebalancing matrix...";
    if (processingStep === 10) return "Reassigning tasks to team members...";
    if (processingStep === 11) return "Sending calendar updates...";
    if (processingStep === 12) return "Calculating historical average time...";
    if (processingStep === 13) return "Auto-logging calculated time...";
    if (processingStep === 14) return "Unblocking dependent milestones...";
    if (processingStep === 15) return "Closing portfolio projects...";
    if (processingStep === 16) return "Verifying project statuses...";
    if (processingStep === 20) return "Checking Slack integration status...";
    return "Processing request...";
  };

  // Render Project Closeout Audit Card (Challenge 1)
  const renderProjectAuditCard = (msg) => {
    const isResolvingAuto = pendingBatchAction && pendingBatchAction.msg === msg && pendingBatchAction.type === 'auto_resolve';
    const isResolvedOrResolving = msg.isResolved || isResolvingAuto;
    
    return (
      <div style={{ marginTop: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden', width: '100%', maxWidth: '820px', fontFamily: 'Inter, sans-serif' }}>
        {/* Header */}
        <div style={{ borderBottom: '1px solid #f1f5f9', padding: '14px 20px', backgroundColor: '#f8fafc', fontWeight: 600, color: '#1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem' }}>
            <Sparkles size={17} color="#8b5cf6" />
            <span>Project Closeout Audit & Policy Triage</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', padding: '3px 10px', borderRadius: '12px', fontWeight: 500 }}>
            Scope: {msg.totalProjects || 31} Projects • {msg.totalTasks || 325} Tasks
          </span>
        </div>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* 4 Telemetry Policy Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '10px' }}>
            
            {/* Policy 4: Timesheets */}
            <div style={{ 
              padding: '12px 14px', 
              borderRadius: '8px', 
              border: '1px solid #e2e8f0', 
              borderTop: '3px solid #f59e0b',
              backgroundColor: '#ffffff', 
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0
            }}>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                <Clock size={13} color="#f59e0b" style={{ flexShrink: 0 }} />
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>P4 • Timesheet</span>
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#b45309', marginTop: '4px', letterSpacing: '-0.02em', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                {msg.unloggedCount || 210} Tasks
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '3px' }}>
                0.00h logged
              </div>
            </div>

            {/* Policy 3: Dependencies */}
            <div style={{ 
              padding: '12px 14px', 
              borderRadius: '8px', 
              border: '1px solid #e2e8f0', 
              borderTop: '3px solid #3b82f6',
              backgroundColor: '#ffffff', 
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0
            }}>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                <Link2 size={13} color="#3b82f6" style={{ flexShrink: 0 }} />
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>P3 • Dependencies</span>
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1d4ed8', marginTop: '4px', letterSpacing: '-0.02em', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                {msg.dependenciesCount || 48} Links
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '3px' }}>
                Predecessor links
              </div>
            </div>

            {/* Policy 1: Milestones */}
            <div style={{ 
              padding: '12px 14px', 
              borderRadius: '8px', 
              border: '1px solid #e2e8f0', 
              borderTop: '3px solid #8b5cf6',
              backgroundColor: '#ffffff', 
              boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0
            }}>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                <Layers size={13} color="#8b5cf6" style={{ flexShrink: 0 }} />
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>P1 • Milestones</span>
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#6d28d9', marginTop: '4px', letterSpacing: '-0.02em', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                {msg.openMilestonesCount || 6} Open
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '3px' }}>
                Billing milestones
              </div>
            </div>

            {/* Gating Blocker */}
            <div style={{ 
              padding: '12px 14px', 
              borderRadius: '8px', 
              border: '1px solid #fecaca', 
              borderTop: '3px solid #ef4444',
              backgroundColor: '#fef2f2', 
              boxShadow: '0 1px 2px rgba(239, 68, 68, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0
            }}>
              <div style={{ fontSize: '0.74rem', color: '#dc2626', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                <AlertCircle size={13} color="#dc2626" style={{ flexShrink: 0 }} />
                <span style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>Gating Blocker</span>
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#dc2626', marginTop: '4px', letterSpacing: '-0.02em', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
                1 Cascade
              </div>
              <div style={{ fontSize: '0.72rem', color: '#ef4444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '3px' }}>
                {msg.projectId || 'PRJ-005'} chain
              </div>
            </div>

          </div>

          {/* Target Project Blocker Banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderLeft: '4px solid #ef4444',
            borderRadius: '8px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AlertTriangle size={16} color="#dc2626" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.98rem' }}>
                    {msg.projectId} • {msg.projectName}
                  </span>
                  <span style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 600 }}>
                    Primary Blocker
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                  Pauses batch closeout across remaining 30 projects
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
                ✓ 30 Projects Ready
              </span>
            </div>
          </div>

          {/* Autonomous Triage & Cascade Visual Box (Replacing the wall of text) */}
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '10px',
            border: '1px solid #e2e8f0',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            
            {/* Triage Funnel Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#64748b', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Triage Path:
              </span>
              <span style={{ backgroundColor: '#ffffff', padding: '2px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', color: '#334155' }}>
                31 Projects (325 Tasks)
              </span>
              <ArrowRight size={12} color="#94a3b8" />
              <span style={{ backgroundColor: '#ffffff', padding: '2px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', color: '#334155' }}>
                210 Unlogged & 48 Links Evaluated
              </span>
              <ArrowRight size={12} color="#94a3b8" />
              <span style={{ backgroundColor: '#fee2e2', padding: '2px 8px', borderRadius: '6px', border: '1px solid #fecaca', color: '#dc2626', fontWeight: 600 }}>
                1 Gating Blocker Isolated
              </span>
            </div>

            {/* 4-Level Cascading Chain Visual Stepper */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '8px',
              backgroundColor: '#ffffff',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>L1 · Project</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e293b' }}>{msg.projectId}</span>
                <span style={{ fontSize: '0.72rem', color: '#ef4444', fontWeight: 500 }}>Locked</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>L2 · Milestone</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e293b' }}>MST-021</span>
                <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 500 }}>Blocked (Child task)</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>L3 · Subtask</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e293b' }}>TSK-0003</span>
                <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 500 }}>Blocked (Predecessor)</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', backgroundColor: '#fef2f2', padding: '6px 8px', borderRadius: '6px', border: '1px solid #fecaca' }}>
                <span style={{ fontSize: '0.7rem', color: '#dc2626', fontWeight: 700 }}>L4 · Root Cause</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#dc2626' }}>TSK-0004</span>
                <span style={{ fontSize: '0.72rem', color: '#b91c1c', fontWeight: 600 }}>0.00h logged (Policy 4)</span>
              </div>
            </div>

            {/* Clear Scannable Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.84rem', color: '#334155', lineHeight: 1.5 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ color: '#8b5cf6', fontWeight: 700 }}>•</span>
                <span>Rather than requiring manual navigation through all <strong>210 unlogged tasks</strong> and <strong>48 dependencies</strong> across 31 separate project boards, Orbito performed automated triage and isolated the root cause locking <strong>{msg.projectId}</strong>.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ color: '#8b5cf6', fontWeight: 700 }}>•</span>
                <span>Resolving this cascade satisfies upstream policies, auto-populates historical pace averages (<strong>02:30</strong>), and closes out the entire portfolio in one verified transaction.</span>
              </div>
            </div>

            {/* Click Reduction Banner */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#047857', backgroundColor: '#ecfdf5', padding: '6px 10px', borderRadius: '6px', border: '1px solid #a7f3d0' }}>
              <Zap size={13} color="#059669" />
              <span><strong>96% Effort Reduction:</strong> Replaces ~85 manual clicks across 31 separate project boards with 1 verified batch action.</span>
            </div>

          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.88rem' }}>
              How would you like to handle {msg.projectId} to complete the portfolio closeout?
            </div>
            
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', opacity: isResolvedOrResolving ? 0.5 : 1, pointerEvents: isResolvedOrResolving ? 'none' : 'auto' }}>
              <button 
                onClick={() => handleAutoResolveComplete(msg)} 
                style={{ 
                  padding: '9px 18px', 
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', 
                  color: '#ffffff', 
                  border: 'none', 
                  borderRadius: '6px', 
                  fontSize: '0.85rem', 
                  fontWeight: 600, 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  boxShadow: '0 2px 4px rgba(124, 58, 237, 0.25)'
                }}
              >
                <Sparkles size={14} color="#ffffff" /> 
                {isResolvingAuto ? 'Resolving Cascade & Closing...' : 'Auto-resolve blocker & complete all projects'}
              </button>

              <button 
                onClick={() => handleInspectDetails(msg)} 
                style={{ 
                  padding: '9px 16px', 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #cbd5e1', 
                  borderRadius: '6px', 
                  fontSize: '0.85rem', 
                  fontWeight: 500, 
                  cursor: 'pointer', 
                  color: '#334155' 
                }}
              >
                Inspect {msg.projectId} 4-level cascade
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  };

  // Render Portfolio Compliance Health Card (Scenario 3)
  const renderComplianceCard = (msg) => {
    const comp = msg.compliance || {};
    const isClean = comp.isAllClosed;

    return (
      <div style={{ marginTop: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden', width: '100%', maxWidth: '820px', fontFamily: 'Inter, sans-serif' }}>
        {/* Card Header */}
        <div style={{ borderBottom: '1px solid #f1f5f9', padding: '14px 20px', backgroundColor: '#f8fafc', fontWeight: 600, color: '#1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem' }}>
            <ShieldCheck size={18} color="#8b5cf6" />
            <span>Portfolio Compliance & Governance Health</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', padding: '3px 10px', borderRadius: '12px', fontWeight: 500 }}>
            {comp.totalProjects || 31} Projects • {comp.totalTasks || 325} Tasks
          </span>
        </div>

        <div style={{ padding: '20px' }}>
          {/* Executive Overview Summary Banner */}
          <div style={{ padding: '16px 20px', backgroundColor: isClean ? '#f0fdf4' : '#fafafa', borderRadius: '10px', border: `1px solid ${isClean ? '#bbf7d0' : '#e5e7eb'}`, marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {comp.complianceScore || 96.8}%
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Compliance Index
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0' }}>
                  ✓ {comp.compliantProjects || 30} Compliant
                </span>
                <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, backgroundColor: isClean ? '#f1f5f9' : '#fef2f2', color: isClean ? '#64748b' : '#dc2626', border: `1px solid ${isClean ? '#e2e8f0' : '#fecaca'}` }}>
                  {isClean ? '0 Flagged' : `${comp.blockedProjects || 1} Flagged`}
                </span>
              </div>
            </div>

            {/* Segmented Progress Track */}
            <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', display: 'flex', marginBottom: '8px' }}>
              <div style={{ width: `${comp.complianceScore || 96.8}%`, height: '100%', backgroundColor: '#10b981', transition: 'width 0.5s ease-out' }}></div>
              {!isClean && (
                <div style={{ width: `${100 - (comp.complianceScore || 96.8)}%`, height: '100%', backgroundColor: '#f59e0b' }}></div>
              )}
            </div>

            <div style={{ fontSize: '0.82rem', color: '#475569' }}>
              {isClean ? (
                <span>All 31 projects and 325 tasks satisfy enterprise governance policies and are ready for archival.</span>
              ) : (
                <span><strong>30 of 31 projects</strong> satisfy all governance policies. <strong>PRJ-005</strong> requires timesheet resolution before portfolio closeout.</span>
              )}
            </div>
          </div>

          {/* 4 Policy Breakdown Tiles (Fixed Single-Line Headers) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginBottom: '18px' }}>
            {/* P1 */}
            <div style={{ padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#8b5cf6' }}></span>
                P1 • Milestones
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                {isClean ? '0 Pending' : `${comp.openMilestonesCount || 6} Open`}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Billing milestones</div>
            </div>

            {/* P2 */}
            <div style={{ padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3b82f6' }}></span>
                P2 • Subtasks
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                {isClean ? '0 Open' : `${comp.subtasksCount || 39} Tracked`}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Nested subtask trees</div>
            </div>

            {/* P3 */}
            <div style={{ padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#06b6d4' }}></span>
                P3 • Dependencies
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>
                {comp.dependenciesCount || 48} Links
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Predecessor chains</div>
            </div>

            {/* P4 */}
            <div style={{ padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isClean ? '#10b981' : '#f59e0b' }}></span>
                P4 • Timesheets
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: isClean ? '#059669' : '#b45309', marginTop: '4px' }}>
                {isClean ? '100% Logged' : `${comp.unloggedCount || 210} Pending`}
              </div>
              <div style={{ fontSize: '0.72rem', color: isClean ? '#059669' : '#b45309', opacity: 0.85 }}>{isClean ? 'All time accounted' : '0.00h logged'}</div>
            </div>
          </div>

          {/* Active Blocker Alert (Clean Border-Left Strip) */}
          {!isClean && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderLeft: '4px solid #f59e0b',
              borderRadius: '8px',
              marginBottom: '0',
              fontSize: '0.85rem'
            }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AlertTriangle size={15} color="#d97706" />
              </div>
              <div style={{ color: '#334155', lineHeight: 1.5 }}>
                <span style={{ fontWeight: 600, color: '#0f172a' }}>Gating Blocker:</span> <strong>PRJ-005</strong> has an unlogged timesheet violation on <code style={{ backgroundColor: '#ffffff', padding: '1px 5px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#1e293b' }}>TSK-0004</code> blocking milestone <code style={{ backgroundColor: '#ffffff', padding: '1px 5px', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#1e293b' }}>MST-021</code>.
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render 4-Level Conflict Matrix (Triage Flow) (Challenge 3)
  const renderPhase2Card = (msg) => {
    const isResolvingManual = pendingBatchAction && pendingBatchAction.msg === msg && pendingBatchAction.type === 'manual_override';
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
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Folder size={16} color="#475569" />
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>{msg.chain.l1.id} • {msg.chain.l1.name}</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>L1 Project</span>
                </td>
                <td style={{ padding: '16px 20px', color: '#64748b' }}>{msg.chain.l1.reason}</td>
                <td style={{ padding: '16px 20px', color: '#f59e0b', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={16} /> Blocked
                </td>
              </tr>
              {/* L2 */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '32px' }}>
                  <CornerDownRight size={16} color="#94a3b8" />
                  <Folder size={16} color="#64748b" />
                  <span style={{ color: '#1e293b' }}>{msg.chain.l2.id} • {msg.chain.l2.name}</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>L2 Milestone</span>
                </td>
                <td style={{ padding: '16px 20px', color: '#64748b' }}>{msg.chain.l2.reason}</td>
                <td style={{ padding: '16px 20px', color: '#f59e0b', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={16} /> Blocked
                </td>
              </tr>
              {/* L3 */}
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '44px' }}>
                  <CornerDownRight size={16} color="#94a3b8" />
                  <Circle size={16} color="#3b82f6" />
                  <span style={{ color: '#1e293b' }}>{msg.chain.l3.id} • {msg.chain.l3.name}</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>L3 Subtask</span>
                </td>
                <td style={{ padding: '16px 20px', color: '#64748b' }}>{msg.chain.l3.reason}</td>
                <td style={{ padding: '16px 20px', color: '#f59e0b', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <AlertCircle size={16} /> Blocked
                </td>
              </tr>
              {/* L4 */}
              <tr style={{ backgroundColor: '#fef2f2' }}>
                <td style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '56px' }}>
                  <Ban size={20} color="#ef4444" />
                  <span style={{ color: '#ef4444', fontWeight: 600 }}>{msg.chain.l4.id} • {msg.chain.l4.name}</span>
                </td>
                <td style={{ padding: '20px 24px' }}>
                  <span style={{ backgroundColor: '#fecaca', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#991b1b' }}>L4 Root Cause</span>
                </td>
                <td style={{ padding: '20px 24px', color: '#ef4444', fontWeight: 500 }}>{msg.chain.l4.reason}</td>
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
                       defaultValue={msg.timeLogged || "02:30"}
                       disabled={isResolvedOrResolving}
                       style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #d1d5db', width: '70px', fontSize: '0.85rem', backgroundColor: isResolvedOrResolving ? '#f1f5f9' : 'white', cursor: isResolvedOrResolving ? 'not-allowed' : 'text' }} 
                     />
                     <button type="submit" disabled={isResolvedOrResolving} style={{ padding: '6px 12px', backgroundColor: msg.isResolved ? '#94a3b8' : (isResolvingManual ? '#f59e0b' : '#10b981'), color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: isResolvedOrResolving ? 'not-allowed' : 'pointer', fontSize: '0.85rem' }}>
                       {msg.isResolved ? 'Resolved' : (isResolvingManual ? 'Resolving...' : 'Resolve')}
                     </button>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Render Resolved Emerald Matrix (Resolved State)
  const renderPhase3Card = (msg) => {
    return (
      <div style={{ marginTop: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden', width: '100%', maxWidth: '900px', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ borderBottom: '1px solid #e2e8f0', padding: '16px 20px', backgroundColor: '#f8fafc', fontWeight: 600, color: '#1e293b' }}>
          Conflict Matrix (Triage Flow — Resolved State)
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Blocked Entity</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Level</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Resolution</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span style={{ color: '#1e293b' }}>{msg.chain.l1.id} • {msg.chain.l1.name}</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>L1 Project</span>
                </td>
                <td style={{ padding: '16px 20px', color: '#64748b' }}>Project closeout requirements met</td>
                <td style={{ padding: '16px 20px', color: '#10b981', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={16} /> Resolved
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '32px' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span style={{ color: '#1e293b' }}>{msg.chain.l2.id} • {msg.chain.l2.name}</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>L2 Milestone</span>
                </td>
                <td style={{ padding: '16px 20px', color: '#64748b' }}>All subtasks completed</td>
                <td style={{ padding: '16px 20px', color: '#10b981', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={16} /> Resolved
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '44px' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span style={{ color: '#1e293b' }}>{msg.chain.l3.id} • {msg.chain.l3.name}</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>L3 Subtask</span>
                </td>
                <td style={{ padding: '16px 20px', color: '#64748b' }}>Predecessor cleared</td>
                <td style={{ padding: '16px 20px', color: '#10b981', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={16} /> Resolved
                </td>
              </tr>
              <tr style={{ backgroundColor: '#ecfdf5' }}>
                <td style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '56px' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span style={{ color: '#047857', fontWeight: 600 }}>{msg.chain.l4.id} • {msg.chain.l4.name}</span>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ backgroundColor: '#d1fae5', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, color: '#047857' }}>L4 Root Cause</span>
                </td>
                <td style={{ padding: '16px 20px', color: '#10b981', fontWeight: 500 }}>Resolved: {msg.timeLogged || '02:30'} logged</td>
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

  // Render Lisa Phase 1 Card (Workload Audit)
  const renderLisaPhase1Card = (msg) => (
    <div style={{ marginTop: '16px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden', width: '100%', maxWidth: '800px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ borderBottom: '1px solid #e2e8f0', padding: '16px 20px', backgroundColor: '#f8fafc', fontWeight: 600, color: '#1e293b' }}>
        Lisa's Workload Audit
      </div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 500 }}>
            Resource Audit: Lisa Allen
          </span>
          <span style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
            3 Priority Tasks Scheduled This Week
          </span>
        </div>
        <div style={{ marginBottom: '16px', fontSize: '0.9rem', color: '#1e293b' }}>
          <strong>Project:</strong> {msg.projectId} • {msg.projectName}
        </div>
        <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
          <strong>Pending Workload:</strong> {msg.lisaTaskCount} tasks (1 in progress with 2.5h unlogged time, 2 unstarted items)
        </div>
        <div style={{ fontWeight: 500, color: '#1e293b', marginBottom: '12px', fontSize: '0.9rem' }}>
          Would you like me to auto-distribute her tasks based on team capacity, or would you prefer to inspect and manually adjust her time logs first?
        </div>
        <div style={{ display: 'flex', gap: '12px', opacity: msg.isResolved ? 0.5 : 1, pointerEvents: msg.isResolved ? 'none' : 'auto' }}>
          <button disabled={msg.isResolved} onClick={() => handleLisaWrapUp(msg, '2.5h')} style={{ padding: '8px 16px', backgroundColor: '#8b5cf6', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="#ffffff" /> Auto-assign to team
          </button>
          <button disabled={msg.isResolved} onClick={() => handleInspectLisaDetails(msg)} style={{ padding: '8px 16px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer' }}>
            Inspect & adjust Lisa's tasks
          </button>
          <button disabled={msg.isResolved} onClick={() => handleSend("Notify Lisa via Slack")} style={{ padding: '8px 16px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer' }}>
            Contact Lisa for status update
          </button>
        </div>
      </div>
    </div>
  );

  // Render Lisa Phase 2 Card (Task Breakdown & Manual Overrides)
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
           <button disabled={msg.isResolved} type="submit" style={{ padding: '10px 20px', backgroundColor: msg.isResolved ? '#94a3b8' : '#10b981', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: msg.isResolved ? 'not-allowed' : 'pointer', width: '100%' }}>
             {msg.isResolved ? 'Submitted' : 'Submit and wrap'}
           </button>
        </div>
      </form>
    </div>
  );

  // Render Lisa Phase 3 Card (Reassignment Matrix Resolved)
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
              <td style={{ padding: '12px' }}><span style={{ color: '#10b981', fontWeight: 500 }}>Completed</span></td>
              <td style={{ padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Lisa Allen ({msg.timeLogged || '2.5h'} Logged)
                  {msg.isManualSubmit && <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>Manual</span>}
                </div>
              </td>
              <td style={{ padding: '12px' }}>Logged</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '12px' }}>{msg.projectName}</td>
              <td style={{ padding: '12px' }}>{msg.todoTask1.TaskId} • {msg.todoTask1.TaskName}</td>
              <td style={{ padding: '12px' }}><span style={{ color: '#8b5cf6', fontWeight: 500 }}>Reassigned</span></td>
              <td style={{ padding: '12px' }}>{msg.assignee1}</td>
              <td style={{ padding: '12px' }}>Dispatched</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '12px' }}>{msg.projectName}</td>
              <td style={{ padding: '12px' }}>{msg.todoTask2.TaskId} • {msg.todoTask2.TaskName}</td>
              <td style={{ padding: '12px' }}><span style={{ color: '#8b5cf6', fontWeight: 500 }}>Reassigned</span></td>
              <td style={{ padding: '12px' }}>{msg.assignee2}</td>
              <td style={{ padding: '12px' }}>Dispatched</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ padding: '20px', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
        <div style={{ color: '#1e293b', fontSize: '0.9rem' }}>
          Calendar updates and handoff notifications have been dispatched to {msg.assignee1} and {msg.assignee2}. Lisa's workload for this week is now 100% resolved.
        </div>
      </div>
    </div>
  );

  // Empty State Rendering
  if (messages.length === 0 && !isProcessing) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', backgroundColor: '#ffffff', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
        {/* Soft Ambient Mesh Aura */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          overflow: 'hidden', 
          pointerEvents: 'none', 
          zIndex: 0 
        }}>
          {/* Primary Violet-Indigo Aura Orb */}
          <div style={{ 
            position: 'absolute', 
            top: '30%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: '850px', 
            height: '480px', 
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(238, 233, 254, 0.85) 0%, rgba(224, 231, 255, 0.55) 45%, rgba(240, 249, 255, 0.25) 70%, rgba(255, 255, 255, 0) 100%)', 
            filter: 'blur(45px)' 
          }} />

          {/* Secondary Soft Violet Accent Glow */}
          <div style={{ 
            position: 'absolute', 
            top: '25%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: '450px', 
            height: '280px', 
            background: 'radial-gradient(circle, rgba(243, 232, 255, 0.75) 0%, rgba(238, 242, 255, 0.4) 50%, rgba(255, 255, 255, 0) 80%)', 
            filter: 'blur(35px)' 
          }} />
        </div>
        
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '620px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ 
              width: '52px', 
              height: '52px', 
              borderRadius: '16px', 
              background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 10px 25px -4px rgba(124, 58, 237, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.3) inset'
            }}>
              <Sparkles size={26} color="white" />
            </div>
          </div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: '28px', lineHeight: 1.25 }}>What should we govern together?</h1>
          
          <div style={{ 
            display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: '24px', 
            padding: '8px 16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(0, 0, 0, 0.03)'
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
                width: '34px', height: '34px', borderRadius: '50%', 
                background: inputValue.trim() ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' : '#f1f5f9', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: inputValue.trim() ? 'pointer' : 'default', transition: 'all 0.2s',
                boxShadow: inputValue.trim() ? '0 2px 6px rgba(124, 58, 237, 0.35)' : 'none',
                flexShrink: 0, marginLeft: '8px'
              }}
            >
              <ArrowRight size={16} color={inputValue.trim() ? "white" : "#94a3b8"} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '18px', maxWidth: '680px' }}>
            <button 
              onClick={() => handleSend("Mark all the projects completed")} 
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: '20px', 
                border: '1px solid #e2e8f0', backgroundColor: '#ffffff', 
                color: '#475569', fontSize: '0.85rem', fontWeight: 500, 
                cursor: 'pointer', transition: 'all 0.2s', 
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)' 
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
            >
              <span>Try: Mark all the projects completed</span>
            </button>

            <button 
              onClick={() => handleSend("Wrap lisa's work with in end of the week")} 
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: '20px', 
                border: '1px solid #e2e8f0', backgroundColor: '#ffffff', 
                color: '#475569', fontSize: '0.85rem', fontWeight: 500, 
                cursor: 'pointer', transition: 'all 0.2s', 
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)' 
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
            >
              <span>Try: Wrap lisa's work with in end of the week</span>
            </button>

            <button 
              onClick={() => handleSend("Check portfolio compliance")} 
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: '20px', 
                border: '1px solid #e2e8f0', backgroundColor: '#ffffff', 
                color: '#475569', fontSize: '0.85rem', fontWeight: 500, 
                cursor: 'pointer', transition: 'all 0.2s', 
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)' 
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.borderColor = '#cbd5e1'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
            >
              <span>Try: Check portfolio compliance</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            {msg.isPhase2 && renderPhase2Card(msg)}
            {msg.isPhase3 && renderPhase3Card(msg)}
            {msg.isComplianceCard && renderComplianceCard(msg)}
            {msg.isLisaPhase1 && renderLisaPhase1Card(msg)}
            {msg.isLisaPhase2 && renderLisaPhase2Card(msg)}
            {msg.isLisaPhase3 && renderLisaPhase3Card(msg)}

            {msg.sender !== 'user' && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px', marginLeft: '4px' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1', padding: '4px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#94a3b8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'} title="Good response"><ThumbsUp size={16} /></button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1', padding: '4px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#94a3b8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'} title="Bad response"><ThumbsDown size={16} /></button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#cbd5e1', padding: '4px', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#94a3b8'} onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'} title="Regenerate"><RotateCcw size={16} /></button>
              </div>
            )}

            {msg.showSurvey && <MicroSurvey />}

            {msg.prompts && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
                {msg.prompts.map((p, i) => {
                  const label = typeof p === 'string' ? p : p.label;
                  const isPrimary = p && p.isPrimary;
                  const icon = p && p.icon;

                  const handleClick = () => {
                    if (p.action === 'navigate_projects' || label === 'See all Projects') {
                      if (setActiveTab) setActiveTab('project_list');
                    } else {
                      handleSend(p.query || label);
                    }
                  };

                  return (
                    <button 
                      key={i}
                      onClick={handleClick}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: isPrimary ? '8px 16px' : '8px 14px',
                        borderRadius: '20px',
                        border: isPrimary ? '1px solid #c4b5fd' : '1px solid #e2e8f0',
                        backgroundColor: isPrimary ? '#f5f3ff' : '#ffffff',
                        color: isPrimary ? '#7c3aed' : '#334155',
                        fontSize: '0.85rem',
                        fontWeight: isPrimary ? 600 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: isPrimary ? '0 1px 3px rgba(124, 58, 237, 0.12)' : '0 1px 2px rgba(0,0,0,0.03)'
                      }}
                      onMouseEnter={(e) => {
                        if (isPrimary) {
                          e.currentTarget.style.backgroundColor = '#ede9fe';
                          e.currentTarget.style.borderColor = '#a78bfa';
                        } else {
                          e.currentTarget.style.backgroundColor = '#f8fafc';
                          e.currentTarget.style.borderColor = '#cbd5e1';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (isPrimary) {
                          e.currentTarget.style.backgroundColor = '#f5f3ff';
                          e.currentTarget.style.borderColor = '#c4b5fd';
                        } else {
                          e.currentTarget.style.backgroundColor = '#ffffff';
                          e.currentTarget.style.borderColor = '#e2e8f0';
                        }
                      }}
                    >
                      {icon === 'sparkles' && <Sparkles size={14} color="#7c3aed" />}
                      {icon === 'zap' && <Zap size={14} color="#f59e0b" />}
                      {icon === 'folder' && <Folder size={14} color="#64748b" />}
                      <span>{label}</span>
                    </button>
                  );
                })}
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
            <div className="typing-dot" style={{ animationDelay: '0s' }}></div>
            <div className="typing-dot" style={{ animationDelay: '0.2s' }}></div>
            <div className="typing-dot" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
        <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 5-second Undo Toast Safety Net (Challenge 4) */}
      {pendingBatchAction && (
        <UndoToast 
          text={pendingBatchAction.text} 
          onUndo={() => {
            setPendingBatchAction(null);
          }} 
          onCommit={() => {
            const action = pendingBatchAction;
            setPendingBatchAction(null);
            if (action.type === 'auto_resolve') {
              commitAutoResolveComplete(action.msg);
            } else if (action.type === 'manual_override') {
              commitManualOverride(action.msg, action.newTime);
            } else if (action.type === 'lisa_wrap') {
              commitLisaWrapUp(action.msg, action.timeLogged, action.finalAssignee1, action.finalAssignee2, action.isManual);
            }
          }} 
        />
      )}

      {(messages.length > 0 || isProcessing) && (
        <div style={{ padding: '24px', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: '24px', padding: '8px 16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', width: '100%', maxWidth: '750px' }}>
            <input 
              type="text" 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && !isProcessing && handleSend()} 
              placeholder="Ask the project governance agent" 
              style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '0.95rem', color: '#1e293b', padding: '8px' }} 
            />
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
