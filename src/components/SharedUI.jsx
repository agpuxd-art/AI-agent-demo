import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical, Diamond, EyeOff, LogOut, ArrowUpDown, Trash2, ChevronRight } from 'lucide-react';

export const AssigneeAvatar = ({ assignee, i }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const initials = assignee.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  
  return (
    <div 
      className="avatar-container"
      style={{ position: 'relative', display: 'inline-block', marginLeft: i > 0 ? '-8px' : '0' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div style={{ 
        width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e2e8f0', color: '#475569', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', 
        fontWeight: 'bold', border: '2px solid white', cursor: 'pointer' 
      }}>
        {initials}
      </div>
      
      {showTooltip && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
          padding: '6px 12px',
          backgroundColor: '#1e293b',
          color: 'white',
          fontSize: '0.75rem',
          fontWeight: 500,
          borderRadius: '6px',
          whiteSpace: 'nowrap',
          zIndex: 50,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          {assignee}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderWidth: '4px',
            borderStyle: 'solid',
            borderColor: '#1e293b transparent transparent transparent'
          }}></div>
        </div>
      )}
    </div>
  );
};

export const ActionMenu = ({ position = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} style={{ position: 'relative', display: 'inline-block' }}>
      <div 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        style={{ padding: '4px', borderRadius: '4px', backgroundColor: isOpen ? '#e2e8f0' : '#f1f5f9', display: 'inline-flex', cursor: 'pointer', transition: 'background-color 0.2s' }}
      >
        <MoreVertical size={16} color="#64748b" />
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          [position]: 0,
          marginTop: '8px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0',
          width: '220px',
          zIndex: 100,
          padding: '8px 0',
          fontSize: '0.875rem',
          color: '#334155',
          textAlign: 'left'
        }}>
          <div style={{ padding: '4px 16px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' }}>More actions</div>
          
          <div className="menu-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', cursor: 'pointer' }}>
            <Diamond size={16} color="#3b82f6" /> Convert to milestone
          </div>
          <div className="menu-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', cursor: 'pointer' }}>
            <EyeOff size={16} color="#475569" /> Mark task as private
          </div>
          <div className="menu-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <LogOut size={16} color="#475569" /> Move to a phase
            </div>
            <ChevronRight size={16} color="#94a3b8" />
          </div>
          <div className="menu-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', cursor: 'pointer' }}>
            <ArrowUpDown size={16} color="#475569" /> Rearrange tasks
          </div>
          
          <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '4px 0' }}></div>
          
          <div className="menu-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', cursor: 'pointer', color: '#ef4444' }}>
            <Trash2 size={16} color="#ef4444" /> Delete
          </div>
        </div>
      )}
      
      <style>{`
        .menu-item:hover {
          background-color: #f8fafc;
        }
      `}</style>
    </div>
  );
};
