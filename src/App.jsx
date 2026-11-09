import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import SubNav from './components/SubNav';
import KanbanBoard from './components/KanbanBoard';
import FilterBar from './components/FilterBar';
import TaskListView from './components/TaskListView';
import AssistantView from './components/AssistantView';
import OverviewView from './components/OverviewView';
import ProjectsListView from './components/ProjectsListView';
import GovernanceChatLayout from './components/GovernanceChatLayout';
import LoginView from './components/LoginView';
import { loadProjectData } from './utils/dataLoader';

function App() {
  const [data, setData] = useState({ projects: [], tasks: [] });
  const [loading, setLoading] = useState(true);
  
  // 'project_list', 'project_plan', 'overview', 'assistant', 'governance_chat'
  const [activeTab, setActiveTab] = useState('project_list'); 
  const [governanceQuery, setGovernanceQuery] = useState('');
  
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Active Project State
  const [activeProject, setActiveProject] = useState(null);
  
  // Chat state management
  const [chatSessions, setChatSessions] = useState([
    { id: 'default', title: 'New Conversation', messages: [], activeConflict: null }
  ]);
  const [activeSessionId, setActiveSessionId] = useState('default');

  useEffect(() => {
    const fetchData = async () => {
      const result = await loadProjectData();
      setData(result);
      if (result.projects.length > 0) {
        setActiveProject(result.projects[0]);
      }
      setLoading(false);
    };
    
    fetchData();
  }, []);
  
  // Show all tasks for the demo so the board is fully populated
  const activeTasks = data.tasks;

  const isChatMode = activeTab === 'governance_chat';
  
  // Allow nested components to mark tasks as completed
  const handleMarkTasksCompleted = (taskIds) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => taskIds.includes(t.TaskId) ? { ...t, Status: 'Completed' } : t)
    }));
  };

  const handleMarkAllTasksCompleted = () => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => ({ ...t, Status: 'Completed' }))
    }));
  };

  const handleMarkAllProjectsCompleted = () => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => ({ ...p, ProjectStatus: 'Completed', Status: 'Completed' })),
      tasks: prev.tasks.map(t => ({ ...t, Status: 'Completed' }))
    }));
  };

  const handleTasksReassigned = (reassignments) => {
    setData(prev => {
      const rMap = new Map(reassignments.map(r => [r.taskId, r]));
      return {
        ...prev,
        tasks: prev.tasks.map(t => {
          if (rMap.has(t.TaskId)) {
            const r = rMap.get(t.TaskId);
            return {
              ...t,
              ...(r.assignee !== undefined ? { Assignee: r.assignee } : {}),
              ...(r.hoursTracked !== undefined ? { HoursTracked: r.hoursTracked } : {}),
              ...(r.status !== undefined ? { Status: r.status } : {})
            };
          }
          return t;
        })
      };
    });
  };

  const hasActiveChat = chatSessions.length > 1 || chatSessions[0].messages.length > 0;

  if (!isAuthenticated) {
    return <LoginView onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setIsAuthenticated(false)} hasActiveChat={hasActiveChat} onTryPrompt={() => { setActiveTab('governance_chat'); }} />
      <div className="main-content" style={{ padding: (isChatMode || activeTab === 'project_list' || activeTab === 'assistant') ? '0' : undefined }}>
        {!isChatMode && activeTab !== 'project_list' && activeTab !== 'assistant' && (
          <>
            <TopNav 
              projectName={activeProject?.ProjectName} 
              customerName={activeProject?.CustomerName} 
            />
            <SubNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </>
        )}
        
        {loading ? (
          <div style={{ padding: '24px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Loading Project Data...
          </div>
        ) : (
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {activeTab === 'project_list' && (
              <ProjectsListView 
                projects={data.projects} 
                tasks={data.tasks}
                onSelectProject={(proj) => {
                  setActiveProject(proj);
                  setActiveTab('project_plan');
                }}
              />
            )}
            
            {activeTab === 'project_plan' && (
              <>
                <FilterBar />
                <KanbanBoard tasks={activeTasks} />
              </>
            )}
            
            {activeTab === 'task_list' && (
              <TaskListView tasks={activeTasks} />
            )}

            {activeTab === 'assistant' && (
              <AssistantView 
                setActiveTab={setActiveTab} 
                setGovernanceQuery={setGovernanceQuery} 
                hasActiveChat={hasActiveChat}
              />
            )}

            {activeTab === 'overview' && (
              <OverviewView project={activeProject} tasks={activeTasks} />
            )}

            {isChatMode && (
              <GovernanceChatLayout 
                initialQuery={governanceQuery} 
                setInitialQuery={setGovernanceQuery} 
                project={activeProject}
                projects={data.projects}
                tasks={activeTasks}
                chatSessions={chatSessions}
                setChatSessions={setChatSessions}
                activeSessionId={activeSessionId}
                setActiveSessionId={setActiveSessionId}
                onTasksCompleted={handleMarkTasksCompleted}
                onAllTasksCompleted={handleMarkAllTasksCompleted}
                onAllProjectsCompleted={handleMarkAllProjectsCompleted}
                onTasksReassigned={handleTasksReassigned}
                setActiveTab={setActiveTab}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
