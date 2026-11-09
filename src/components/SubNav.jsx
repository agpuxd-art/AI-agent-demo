import React from 'react';
import { Layers } from 'lucide-react';

const SubNav = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sub-nav">
      {/* 
      <div 
        className={`sub-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
        onClick={() => setActiveTab('overview')}
        title="Project Overview: Summary and key metrics"
      >
        <Home size={16} /> Overview
      </div> 
      */}
      <div 
        className={`sub-nav-item ${activeTab === 'project_plan' || activeTab === 'task_list' ? 'active' : ''}`}
        onClick={() => setActiveTab('project_plan')}
        title="Project Plan: Kanban board and task management"
      >
        <Layers size={16} /> Project plan
      </div>
    </div>
  );
};

export default SubNav;
