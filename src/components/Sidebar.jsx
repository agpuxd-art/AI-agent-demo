import React, { useState, useEffect } from 'react';
import { ClipboardCheck, Sparkles, Target, Users, Settings, Bell, MessageSquare, Briefcase, Plus } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout, hasActiveChat, onTryPrompt }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCoachmark, setShowCoachmark] = useState(true);

  useEffect(() => {
    if (!showCoachmark) return;
    const handleClick = () => setShowCoachmark(false);
    
    // Add small delay so the initial mount doesn't immediately dismiss
    const timer = setTimeout(() => {
      window.addEventListener('click', handleClick);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleClick);
    };
  }, [showCoachmark]);
  
  return (
    <div className="sidebar">
      <div className="sidebar-icon" title="Notifications" style={{ opacity: 0.3, pointerEvents: 'none' }}><Bell size={20} /></div>
      
      {/* Task/Project Plan Icon -> Project List/Plan */}
      <div 
        className={`sidebar-icon ${(activeTab === 'project_plan' || activeTab === 'project_list') ? 'active' : ''}`}
        onClick={() => setActiveTab('project_list')}
        title="Projects: View all projects and their Kanban boards"
      >
        <ClipboardCheck size={20} />
      </div>

      {/* Sparkle Icon -> Assistant */}
      <div style={{ position: 'relative' }}>
        <div 
          className={`sidebar-icon ${activeTab === 'assistant' || activeTab === 'governance_chat' ? 'active' : ''}`}
          onClick={() => setActiveTab(hasActiveChat ? 'governance_chat' : 'assistant')}
          title="Orbito Assistant: Access AI agents for automation and governance"
        >
          <Sparkles size={20} />
        </div>
        
        {showCoachmark && (
          <div className="coachmark-popup" style={{
            position: 'absolute',
            left: '100%',
            top: '50%',
            transform: 'translateY(-50%)',
            marginLeft: '16px',
            backgroundColor: '#1e293b',
            color: 'white',
            padding: '16px',
            borderRadius: '12px',
            width: '280px',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
            zIndex: 1000,
            fontFamily: 'Inter, sans-serif'
          }}>
            {/* Arrow */}
            <div className="coachmark-arrow" style={{
              position: 'absolute',
              left: '-6px',
              top: '50%',
              transform: 'translateY(-50%) rotate(45deg)',
              width: '12px',
              height: '12px',
              backgroundColor: '#1e293b'
            }}></div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>✨</span>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Meet the Governance Agent</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '16px', lineHeight: '1.4' }}>
              Audit 4-level policy blockers & resolve missing time logs in seconds.
            </div>
            
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setShowCoachmark(false)} 
                style={{ backgroundColor: 'transparent', border: '1px solid #475569', color: '#cbd5e1', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                Dismiss
              </button>
              <button 
                onClick={() => {
                  setShowCoachmark(false);
                  if (onTryPrompt) onTryPrompt();
                }} 
                style={{ backgroundColor: '#8b5cf6', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                Try Example Prompt
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Disabled Icons */}
      <div className="sidebar-icon" title="Resources (Coming Soon)" style={{ opacity: 0.3, pointerEvents: 'none' }}><Briefcase size={20} /></div>
      <div className="sidebar-icon" title="Goals (Coming Soon)" style={{ opacity: 0.3, pointerEvents: 'none' }}><Target size={20} /></div>
      <div className="sidebar-icon" title="Team (Coming Soon)" style={{ opacity: 0.3, pointerEvents: 'none' }}><Users size={20} /></div>
      <div className="sidebar-icon" title="Chat (Coming Soon)" style={{ opacity: 0.3, pointerEvents: 'none' }}><MessageSquare size={20} /></div>
      
      <div style={{ flex: 1 }}></div>
      
      <div className="sidebar-icon" title="Create New (Coming Soon)" style={{ opacity: 0.3, pointerEvents: 'none' }}><Plus size={20} /></div>
      <div className="sidebar-icon" title="Settings (Coming Soon)" style={{ opacity: 0.3, pointerEvents: 'none' }}><Settings size={20} /></div>
      
      {/* User Avatar */}
      <div style={{ position: 'relative' }}>
        <div 
          className="sidebar-icon" 
          title="User Profile: Alex" 
          style={{ backgroundColor: '#3b82f6', color: 'white', borderRadius: '50%', marginBottom: '16px', cursor: 'pointer' }}
          onClick={() => setShowMenu(!showMenu)}
        >
          A
        </div>
        {showMenu && (
          <div style={{ position: 'absolute', left: '100%', bottom: '16px', marginLeft: '8px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', padding: '4px', minWidth: '100px', zIndex: 100, border: '1px solid #e2e8f0' }}>
            <div 
              onClick={() => {
                setShowMenu(false);
                if (onLogout) onLogout();
              }}
              style={{ padding: '8px 12px', cursor: 'pointer', fontSize: '0.9rem', color: '#ef4444', fontWeight: 500, borderRadius: '4px', display: 'flex', alignItems: 'center', transition: 'background-color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
