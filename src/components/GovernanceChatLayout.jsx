import React, { useState } from 'react';
import { Plus, Search, MessageSquare, Sparkles, ArrowLeft } from 'lucide-react';
import GovernanceAgent from './GovernanceAgent';
import CaseStudyModal from './CaseStudyModal';

const GovernanceChatLayout = ({ 
  initialQuery, setInitialQuery, 
  project, projects, tasks, 
  chatSessions, setChatSessions, 
  activeSessionId, setActiveSessionId,
  onTasksCompleted,
  onAllTasksCompleted,
  onAllProjectsCompleted,
  onTasksReassigned,
  setActiveTab
}) => {
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  
  const handleNewChat = () => {
    const newId = Date.now().toString();
    setChatSessions(prev => [
      { id: newId, title: 'New Conversation', messages: [], activeConflict: null },
      ...prev
    ]);
    setActiveSessionId(newId);
  };

  // Find the active session data
  const activeSession = chatSessions.find(s => s.id === activeSessionId) || chatSessions[0];

  const updateActiveSession = (updates) => {
    setChatSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        return { ...s, ...updates };
      }
      return s;
    }));
  };

  // The recent history should only show sessions that have at least 1 message,
  // OR the current active empty session (so they can see 'New Conversation' if they just clicked the button).
  const visibleSessions = chatSessions.filter(s => s.messages.length > 0 || s.id === activeSessionId);

  return (
    <div className="chat-layout-container" style={{ display: 'flex', flex: 1, backgroundColor: '#ffffff', overflow: 'hidden' }}>
      
      {/* Secondary Sidebar */}
      <div className="chat-sidebar" style={{ 
        width: '320px', 
        backgroundColor: '#f8fafc', 
        borderRight: '1px solid #e2e8f0',
        display: 'flex', 
        flexDirection: 'column',
        padding: '24px 16px'
      }}>
        {/* Back Button */}
        <button 
          onClick={() => setActiveTab('assistant')}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: 'transparent', border: 'none', 
            color: '#64748b', fontSize: '0.9rem', fontWeight: 500, 
            cursor: 'pointer', marginBottom: '24px', padding: 0
          }}
        >
          <ArrowLeft size={16} /> Back to Assistant
        </button>

        {/* Header / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingLeft: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={16} color="white" />
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b' }}>Project Governance Agent</div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
          <button 
            onClick={handleNewChat}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', 
              backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px',
              color: '#1e293b', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)', transition: 'background-color 0.2s'
            }}>
            <Plus size={16} color="#64748b" /> Start a new chat
          </button>
          
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', 
            backgroundColor: 'transparent', border: 'none', borderRadius: '8px',
            color: '#64748b', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer',
            textAlign: 'left'
          }}>
            <Search size={16} /> Search chat
          </button>
        </div>

        {/* Recent History */}
        {visibleSessions.length > 0 && (
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', paddingLeft: '16px' }}>
              Recent
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {visibleSessions.map((session) => (
                <div 
                  key={session.id} 
                  onClick={() => setActiveSessionId(session.id)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px',
                    backgroundColor: activeSessionId === session.id ? '#e0e7ff' : 'transparent', 
                    borderRadius: '8px', cursor: 'pointer',
                    color: activeSessionId === session.id ? '#1e293b' : '#64748b', 
                    fontSize: '0.85rem', fontWeight: activeSessionId === session.id ? 500 : 400
                  }}>
                  <MessageSquare size={14} color={activeSessionId === session.id ? "#6366f1" : "currentColor"} />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {session.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sidebar Case Study Trigger */}
        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
          <button
            onClick={() => setShowCaseStudy(true)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 12px',
              backgroundColor: '#f5f3ff',
              border: '1px solid #ddd6fe',
              borderRadius: '8px',
              color: '#7c3aed',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ede9fe'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f5f3ff'}
          >
            <Sparkles size={14} color="#7c3aed" /> UX Case Study & Architecture
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        <GovernanceAgent 
          initialQuery={initialQuery} 
          setInitialQuery={setInitialQuery} 
          project={project}
          projects={projects}
          tasks={tasks}
          session={activeSession}
          updateSession={updateActiveSession}
          onTasksCompleted={onTasksCompleted}
          onAllTasksCompleted={onAllTasksCompleted}
          onAllProjectsCompleted={onAllProjectsCompleted}
          onTasksReassigned={onTasksReassigned}
          setActiveTab={setActiveTab}
        />

        <CaseStudyModal 
          isOpen={showCaseStudy} 
          onClose={() => setShowCaseStudy(false)} 
          onLaunchScenario={(scenario) => setInitialQuery(scenario)}
        />
      </div>

    </div>
  );
};

export default GovernanceChatLayout;
