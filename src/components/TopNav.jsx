import React from 'react';
import { UserPlus } from 'lucide-react';

const TopNav = ({ projectName, customerName }) => {
  return (
    <div className="top-nav">
      <div className="top-nav-left">
        <div className="project-icon" style={{ backgroundColor: '#3b82f6' }}>
          {customerName ? customerName.charAt(0).toUpperCase() : 'J'}
        </div>
        <div className="project-details">
          <div className="breadcrumb">
            {customerName || 'Customer'} /
          </div>
          <h1 className="project-title">{projectName || 'Project Title'}</h1>
        </div>
      </div>
      
      <div className="top-nav-right">
        {/* Removed the circular nav-action-btn elements as requested */}
        <button className="invite-btn" title="Invite team members to this project">
          <UserPlus size={16} />
          Invite
        </button>
      </div>
    </div>
  );
};

export default TopNav;
