import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Truck, 
  FolderKanban, 
  FileText, 
  ShieldAlert, 
  Settings, 
  Sun, 
  Moon, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Users, 
  Database, 
  Server, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowUpRight, 
  Search, 
  Filter, 
  Download,
  Lock,
  Unlock,
  ChevronRight,
  Gauge,
  Fuel,
  Wrench,
  MapPin,
  FileCode2,
  Layers
} from 'lucide-react';

export default function App() {
  // --- Theme & Role State ---
  const [darkMode, setDarkMode] = useState(true);
  const [currentRole, setCurrentRole] = useState('Administrator'); // Administrator, Project Manager, Viewer
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, projects, fleet, records, audit, blueprint

  // --- Toast Notification State ---
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  // --- Initial Mock Data ---
  const [projects, setProjects] = useState([
    { id: 'PRJ-001', name: 'Metro Expansion Phase 2', client: 'City Transit Authority', status: 'Active', budget: '$4.2M', progress: 68, supervisor: 'Marcus Vance' },
    { id: 'PRJ-002', name: 'Solar Grid Substation Alpha', client: 'GreenPower Corp', status: 'Active', budget: '$2.8M', progress: 42, supervisor: 'Elena Rostova' },
    { id: 'PRJ-003', name: 'High-Way 101 Bridge Overhaul', client: 'State DOT', status: 'Pending', budget: '$6.5M', progress: 15, supervisor: 'Marcus Vance' },
    { id: 'PRJ-004', name: 'Port Logistics Terminal Dock 4', client: 'Global Shipping Ltd', status: 'Completed', budget: '$9.1M', progress: 100, supervisor: 'Sarah Jenkins' }
  ]);

  const [fleet, setFleet] = useState([
    { id: 'FLT-101', name: 'CAT 336 Excavator', type: 'Heavy Machinery', status: 'Deployed', project: 'Metro Expansion Phase 2', operator: 'Dave Miller', fuel: '74%', hours: '3,420h' },
    { id: 'FLT-102', name: 'Komatsu Dump Truck 770', type: 'Transport', status: 'Maintenance', project: 'High-Way 101 Bridge Overhaul', operator: 'Unassigned', fuel: '12%', hours: '5,890h' },
    { id: 'FLT-103', name: 'Liebherr LTM Crane', type: 'Heavy Lift', status: 'Deployed', project: 'Solar Grid Substation Alpha', operator: 'Tim Briggs', fuel: '88%', hours: '1,920h' },
    { id: 'FLT-104', name: 'Ford F-550 Service Rig', type: 'Support Vehicle', status: 'Idle', project: 'HQ Depot', operator: 'Sammy Chen', fuel: '95%', hours: '14,200h' }
  ]);

  const [records, setRecords] = useState([
    { id: 'REC-501', date: '2026-06-04', type: 'Daily Operation', project: 'Metro Expansion Phase 2', author: 'Marcus Vance', summary: 'Completed foundation pouring for pillar 14-B ahead of schedule.', status: 'Verified', isDeleted: false },
    { id: 'REC-502', date: '2026-06-03', type: 'Material Deployment', project: 'Solar Grid Substation Alpha', author: 'Elena Rostova', summary: 'Delivered 4x high-voltage transformers (Unit A to D).', status: 'Pending Review', isDeleted: false },
    { id: 'REC-503', date: '2026-06-02', type: 'Fleet Maintenance', project: 'High-Way 101 Bridge Overhaul', author: 'Dave Miller', summary: 'Hydraulic hose replacement on Komatsu Dump Truck 770.', status: 'Completed', isDeleted: false }
  ]);

  // Soft-deleted archival store
  const [auditLog, setAuditLog] = useState([
    { id: 'AUD-001', timestamp: '2026-06-01 14:22', action: 'SOFT_DELETE', target: 'Record #REC-498', user: 'Administrator', details: 'Archived obsolete delivery log.' }
  ]);

  // Modal states for inputs
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isFleetModalOpen, setIsFleetModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // Form states
  const [newProject, setNewProject] = useState({ name: '', client: '', budget: '', supervisor: '' });
  const [newFleet, setNewFleet] = useState({ name: '', type: '', project: '', operator: '' });
  const [newRecord, setNewRecord] = useState({ type: 'Daily Operation', project: '', summary: '' });

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');

  // --- Handlers ---
  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.name || !newProject.client) return showToast('Please fill out required fields', 'error');
    const created = {
      id: `PRJ-00${projects.length + 1}`,
      ...newProject,
      status: 'Active',
      progress: 0
    };
    setProjects([created, ...projects]);
    setNewProject({ name: '', client: '', budget: '', supervisor: '' });
    setIsProjectModalOpen(false);
    showToast('Project successfully created!');
  };

  const handleAddFleet = (e) => {
    e.preventDefault();
    if (!newFleet.name) return showToast('Please provide vehicle name', 'error');
    const created = {
      id: `FLT-10${fleet.length + 1}`,
      ...newFleet,
      status: 'Deployed',
      fuel: '100%',
      hours: '0h'
    };
    setFleet([created, ...fleet]);
    setNewFleet({ name: '', type: '', project: '', operator: '' });
    setIsFleetModalOpen(false);
    showToast('Fleet asset registered successfully!');
  };

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (!newRecord.summary) return showToast('Record summary is required', 'error');
    const created = {
      id: `REC-50${records.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      ...newRecord,
      author: currentRole === 'Administrator' ? 'Admin User' : 'Field Supervisor',
      status: 'Verified',
      isDeleted: false
    };
    setRecords([created, ...records]);
    setNewRecord({ type: 'Daily Operation', project: '', summary: '' });
    setIsRecordModalOpen(false);
    showToast('Operation record logged successfully!');
  };

  const handleSoftDeleteRecord = (id) => {
    if (currentRole === 'Viewer') return showToast('Permission denied for viewers', 'error');
    
    const target = records.find(r => r.id === id);
    setRecords(records.map(r => r.id === id ? { ...r, isDeleted: true } : r));
    
    // Log to audit trail
    const auditEntry = {
      id: `AUD-00${auditLog.length + 2}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      action: 'SOFT_DELETE',
      target: `Record #${id} (${target?.type || 'General'})`,
      user: currentRole,
      details: 'Moved to archival trash bin with retention protocol.'
    };
    setAuditLog([auditEntry, ...auditLog]);
    showToast(`Record ${id} archived successfully (soft-deleted).`);
  };

  const handleRestoreRecord = (id) => {
    if (currentRole !== 'Administrator') return showToast('Only Administrators can restore archives', 'error');
    setRecords(records.map(r => r.id === id ? { ...r, isDeleted: false } : r));
    showToast(`Record ${id} restored from archive.`);
  };

  // Filtered active records
  const activeRecords = records.filter(r => !r.isDeleted);
  const deletedRecords = records.filter(r => r.isDeleted);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 text-sm font-medium border animate-bounce ${
          toast.type === 'error' 
            ? 'bg-rose-900/90 text-rose-100 border-rose-700' 
            : darkMode ? 'bg-slate-900 text-emerald-400 border-emerald-500/30' : 'bg-white text-emerald-700 border-emerald-200'
        }`}>
          {toast.type === 'error' ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Header / Navigation Bar */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg">
              OP
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
                OmniFleet & Ops Pro
              </h1>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Enterprise Project & Resource Tracking
              </p>
            </div>
          </div>

          {/* Role Switcher & Controls */}
          <div className="flex items-center space-x-4">
            
            {/* Role Switcher Pill */}
            <div className={`hidden md:flex items-center p-1 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
              <span className={`text-xs font-semibold px-2.5 py-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Role:</span>
              {['Administrator', 'Project Manager', 'Viewer'].map((role) => (
                <button
                  key={role}
                  onClick={() => setCurrentRole(role)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    currentRole === role 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                      : darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl border transition-all ${
                darkMode 
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Toggle Dark/Light Mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Role Switcher Bar */}
      <div className={`md:hidden px-4 py-2 border-b flex items-center justify-between overflow-x-auto ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
        <span className="text-xs font-medium text-slate-400">Active Role:</span>
        <div className="flex space-x-1">
          {['Administrator', 'Project Manager', 'Viewer'].map((role) => (
            <button
              key={role}
              onClick={() => setCurrentRole(role)}
              className={`px-2 py-1 rounded text-xs ${currentRole === role ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
            >
              {role.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main App Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 border-b border-slate-800/40">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'projects', label: 'Projects', icon: FolderKanban },
            { id: 'fleet', label: 'Fleet & Resources', icon: Truck },
            { id: 'records', label: 'Input Records', icon: FileText },
            { id: 'audit', label: 'Audit & Trash', icon: ShieldAlert, badge: deletedRecords.length },
            { id: 'blueprint', label: 'Vercel & DB Blueprint', icon: Server }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' 
                    : darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-900/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 text-xs bg-rose-500 text-white rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ================= TAB 1: DASHBOARD ================= */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Welcome Banner */}
            <div className={`p-6 rounded-2xl border relative overflow-hidden ${darkMode ? 'bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border-indigo-900/30' : 'bg-gradient-to-r from-indigo-50 via-white to-white border-indigo-100 shadow-sm'}`}>
              <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      Mode: {currentRole}
                    </span>
                    <span className="text-xs text-slate-400">• Vercel Edge Connected</span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">Operations Command Center</h2>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Real-time telemetry across {projects.length} active construction & field projects and {fleet.length} fleet assets.
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  {(currentRole === 'Administrator' || currentRole === 'Project Manager') && (
                    <button
                      onClick={() => setIsRecordModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30 flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Log Daily Record</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Active Projects</span>
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <FolderKanban className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <div className="text-3xl font-extrabold">{projects.filter(p => p.status === 'Active').length}</div>
                  <span className="text-xs text-emerald-400 font-medium flex items-center">
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 100% on schedule
                  </span>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs flex justify-between ${darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
                  <span>Total Budget</span>
                  <span className="font-semibold">$22.6M USD</span>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Fleet Deployed</span>
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Truck className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <div className="text-3xl font-extrabold">{fleet.filter(f => f.status === 'Deployed').length} / {fleet.length}</div>
                  <span className="text-xs text-cyan-400 font-medium">Active Units</span>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs flex justify-between ${darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
                  <span>Maintenance Queue</span>
                  <span className="font-semibold text-amber-400">{fleet.filter(f => f.status === 'Maintenance').length} Units</span>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Verified Logs</span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <div className="text-3xl font-extrabold">{activeRecords.length}</div>
                  <span className="text-xs text-emerald-400 font-medium">This Week</span>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs flex justify-between ${darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
                  <span>Archived Trash</span>
                  <span className="font-semibold">{deletedRecords.length} Records</span>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>System Security</span>
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <div className="text-3xl font-extrabold">SECURE</div>
                  <span className="text-xs text-purple-400 font-medium">RBAC Active</span>
                </div>
                <div className={`mt-3 pt-3 border-t text-xs flex justify-between ${darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
                  <span>Current Profile</span>
                  <span className="font-semibold text-indigo-400">{currentRole}</span>
                </div>
              </div>

            </div>

            {/* Recent Activity & Project Progress breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Project Progress Overview */}
              <div className={`lg:col-span-2 p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Active Projects Progress</h3>
                  <button onClick={() => setActiveTab('projects')} className="text-xs font-medium text-indigo-400 hover:underline">
                    View All Projects →
                  </button>
                </div>
                
                <div className="space-y-5">
                  {projects.map((proj) => (
                    <div key={proj.id} className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold">{proj.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          proj.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 
                          proj.status === 'Completed' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {proj.status} • {proj.progress}%
                        </span>
                      </div>
                      <div className={`w-full h-2.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                      <div className={`flex justify-between text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        <span>Client: {proj.client}</span>
                        <span>Supervisor: {proj.supervisor}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fleet Status Summary Card */}
              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">Fleet Telemetry</h3>
                    <Truck className="w-5 h-5 text-cyan-400" />
                  </div>
                  <p className={`text-xs mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    Real-time status breakdown of heavy equipment and service vehicles across sites.
                  </p>

                  <div className="space-y-4">
                    {fleet.map((item) => (
                      <div key={item.id} className={`p-3 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-slate-950/40 border-slate-800/80' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex items-center space-x-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${
                            item.status === 'Deployed' ? 'bg-emerald-400 animate-pulse' :
                            item.status === 'Maintenance' ? 'bg-amber-400' : 'bg-slate-400'
                          }`} />
                          <div>
                            <p className="text-xs font-bold">{item.name}</p>
                            <p className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.project}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            item.status === 'Deployed' ? 'bg-emerald-500/10 text-emerald-400' :
                            item.status === 'Maintenance' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-500/10 text-slate-400'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('fleet')}
                  className={`mt-6 w-full py-2.5 rounded-xl text-xs font-medium border transition-all ${darkMode ? 'border-slate-800 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'}`}
                >
                  Manage All Fleet Assets →
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ================= TAB 2: PROJECTS ================= */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Project Portfolio</h2>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Manage budgets, clients, progress milestones, and site supervisors.
                </p>
              </div>

              {(currentRole === 'Administrator' || currentRole === 'Project Manager') && (
                <button
                  onClick={() => setIsProjectModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Project</span>
                </button>
              )}
            </div>

            {/* Projects Table */}
            <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b text-xs font-semibold uppercase tracking-wider ${darkMode ? 'border-slate-800 text-slate-400 bg-slate-900/90' : 'border-slate-200 text-slate-500 bg-slate-50'}`}>
                      <th className="p-4">Project ID & Name</th>
                      <th className="p-4">Client</th>
                      <th className="p-4">Supervisor</th>
                      <th className="p-4">Budget</th>
                      <th className="p-4">Status & Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-sm">
                    {projects.map((proj) => (
                      <tr key={proj.id} className={`transition-colors ${darkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}`}>
                        <td className="p-4">
                          <div className="font-bold">{proj.name}</div>
                          <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{proj.id}</div>
                        </td>
                        <td className="p-4">{proj.client}</td>
                        <td className="p-4 font-medium text-indigo-400">{proj.supervisor}</td>
                        <td className="p-4 font-semibold">{proj.budget}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                              proj.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 
                              proj.status === 'Completed' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-amber-500/20 text-amber-400'
                            }`}>
                              {proj.status}
                            </span>
                            <span className="text-xs font-bold">{proj.progress}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 3: FLEET & RESOURCES ================= */}
        {activeTab === 'fleet' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Fleet & Resource Tracing</h2>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Monitor heavy equipment deployment, operator assignments, fuel levels, and operational hours.
                </p>
              </div>

              {currentRole === 'Administrator' && (
                <button
                  onClick={() => setIsFleetModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-cyan-600 text-white font-medium text-sm hover:bg-cyan-500 transition-all shadow-md shadow-cyan-600/30 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register Fleet Unit</span>
                </button>
              )}
            </div>

            {/* Fleet Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {fleet.map((item) => (
                <div key={item.id} className={`p-5 rounded-2xl border flex flex-col justify-between ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs px-2.5 py-1 rounded font-semibold ${
                        item.status === 'Deployed' ? 'bg-emerald-500/20 text-emerald-400' :
                        item.status === 'Maintenance' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {item.status}
                      </span>
                      <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.id}</span>
                    </div>

                    <h3 className="font-bold text-base mb-1">{item.name}</h3>
                    <p className={`text-xs mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{item.type} • Assigned to {item.project}</p>

                    <div className={`space-y-2 p-3 rounded-xl border text-xs ${darkMode ? 'bg-slate-950/60 border-slate-800/80 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center"><Users className="w-3.5 h-3.5 mr-1.5 text-indigo-400" /> Operator:</span>
                        <span className="font-semibold">{item.operator}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center"><Fuel className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> Fuel Level:</span>
                        <span className="font-semibold">{item.fuel}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-cyan-400" /> Engine Hours:</span>
                        <span className="font-semibold">{item.hours}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/40 flex justify-between items-center text-xs">
                    <span className="text-slate-400">GPS Telemetry</span>
                    <span className="text-emerald-400 font-semibold flex items-center">
                      <MapPin className="w-3 h-3 mr-1" /> Active Signal
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= TAB 4: INPUT RECORDS ================= */}
        {activeTab === 'records' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Daily Operation & Material Records</h2>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Input, view, and audit field updates. Administrators can soft-delete records into the secure audit archive.
                </p>
              </div>

              {(currentRole === 'Administrator' || currentRole === 'Project Manager') && (
                <button
                  onClick={() => setIsRecordModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Log New Record</span>
                </button>
              )}
            </div>

            {/* Records Table */}
            <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className={`border-b text-xs font-semibold uppercase tracking-wider ${darkMode ? 'border-slate-800 text-slate-400 bg-slate-900/90' : 'border-slate-200 text-slate-500 bg-slate-50'}`}>
                      <th className="p-4">Record ID / Date</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Project</th>
                      <th className="p-4">Author</th>
                      <th className="p-4">Summary</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-sm">
                    {activeRecords.map((rec) => (
                      <tr key={rec.id} className={`transition-colors ${darkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}`}>
                        <td className="p-4">
                          <div className="font-bold">{rec.id}</div>
                          <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{rec.date}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                            {rec.type}
                          </span>
                        </td>
                        <td className="p-4 font-medium">{rec.project}</td>
                        <td className={`p-4 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{rec.author}</td>
                        <td className="p-4 max-w-md text-xs leading-relaxed">{rec.summary}</td>
                        <td className="p-4 text-right">
                          {currentRole !== 'Viewer' ? (
                            <button
                              onClick={() => handleSoftDeleteRecord(rec.id)}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all border border-rose-500/20 flex items-center space-x-1 ml-auto"
                              title="Soft-delete record (Keep in audit trail)"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Archive</span>
                            </button>
                          ) : (
                            <span className="text-xs text-slate-500 italic">View Only</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 5: AUDIT & TRASH (SOFT-DELETE ARCHIVE) ================= */}
        {activeTab === 'audit' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Audit Trail & Soft-Deleted Records</h2>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Compliance archive keeping records intact for auditing. Administrators can restore records or inspect deletion logs.
                </p>
              </div>
            </div>

            {/* Soft-Deleted Records Section */}
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <h3 className="font-bold text-base mb-4 flex items-center">
                <Trash2 className="w-4 h-4 text-rose-400 mr-2" />
                Archived Trash Bin ({deletedRecords.length})
              </h3>

              {deletedRecords.length === 0 ? (
                <p className={`text-sm italic py-4 text-center ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  No soft-deleted records currently in the trash bin. Records deleted from the active log will appear here for compliance.
                </p>
              ) : (
                <div className="space-y-3">
                  {deletedRecords.map((rec) => (
                    <div key={rec.id} className={`p-4 rounded-xl border flex items-center justify-between ${darkMode ? 'bg-rose-950/20 border-rose-900/30' : 'bg-rose-50 border-rose-200'}`}>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-xs text-rose-400">{rec.id}</span>
                          <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>• {rec.project}</span>
                        </div>
                        <p className="text-sm mt-1">{rec.summary}</p>
                      </div>
                      {currentRole === 'Administrator' && (
                        <button
                          onClick={() => handleRestoreRecord(rec.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 flex items-center space-x-1"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Restore</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* System Audit Log */}
            <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <h3 className="font-bold text-base mb-4 flex items-center">
                <ShieldAlert className="w-4 h-4 text-purple-400 mr-2" />
                Immutable System Audit Trail
              </h3>

              <div className="space-y-3">
                {auditLog.map((log) => (
                  <div key={log.id} className={`p-4 rounded-xl border text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${darkMode ? 'bg-slate-950/60 border-slate-800/80 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                    <div className="flex items-center space-x-3">
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-bold">{log.action}</span>
                      <span className="font-bold">{log.target}</span>
                      <span className="text-slate-500">({log.details})</span>
                    </div>
                    <div className="flex items-center space-x-4 text-slate-400">
                      <span>User: {log.user}</span>
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 6: VERCEL & DB BLUEPRINT ================= */}
        {activeTab === 'blueprint' && (
          <div className="space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Production Vercel & Database Architecture</h2>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Blueprint for deploying this web application to Vercel with PostgreSQL (Supabase / Prisma ORM) and Role-Based Access Control (RBAC).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Prisma / SQL Schema */}
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className="font-bold text-base mb-3 flex items-center">
                  <Database className="w-4 h-4 text-indigo-400 mr-2" />
                  Prisma Schema (PostgreSQL for Vercel)
                </h3>
                <p className={`text-xs mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Define your database models supporting soft-delete (`isDeleted`), audit logging, and multi-role profiles.
                </p>

                <pre className={`p-4 rounded-xl text-xs font-mono overflow-x-auto ${darkMode ? 'bg-slate-950 text-indigo-300 border border-slate-800' : 'bg-slate-900 text-indigo-200'}`}>
{`datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Project {
  id         String   @id @default(cuid())
  name       String
  client     String
  status     String   @default("Active")
  budget     Float
  progress   Int      @default(0)
  supervisor String
  createdAt  DateTime @default(now())
}

model Record {
  id        String   @id @default(cuid())
  date      DateTime @default(now())
  type      String
  project   String
  author    String
  summary   String
  isDeleted Boolean  @default(false)
  createdAt DateTime @default(now())
}`}
                </pre>
              </div>

              {/* Vercel Deployment Steps */}
              <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <h3 className="font-bold text-base mb-3 flex items-center">
                  <Server className="w-4 h-4 text-cyan-400 mr-2" />
                  Vercel Deployment Blueprint
                </h3>
                <p className={`text-xs mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Follow these steps to push your Next.js project to production on Vercel.
                </p>

                <ol className={`space-y-3 text-xs list-decimal pl-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li><strong className="text-indigo-400">Initialize Git Repository:</strong> Run `git init`, `git add .`, and `git commit -m "Initial commit"` in your local environment.</li>
                  <li><strong className="text-indigo-400">Connect to Vercel:</strong> Import your GitHub repository into Vercel dashboard.</li>
                  <li><strong className="text-indigo-400">Configure Environment Variables:</strong> Add your Supabase or Neon PostgreSQL connection string as `DATABASE_URL` in Vercel project settings.</li>
                  <li><strong className="text-indigo-400">Build & Deploy:</strong> Vercel will automatically run `next build` and deploy your app globally on the Edge Network.</li>
                </ol>

                <div className={`mt-6 p-4 rounded-xl border ${darkMode ? 'bg-emerald-950/20 border-emerald-900/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800'}`}>
                  <p className="text-xs font-medium flex items-center">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400" />
                    Ready for Next.js App Router (React Server Components + API Routes).
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* ================= MODALS FOR CREATING RECORDS / PROJECTS / FLEET ================= */}
      
      {/* Create Project Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="font-bold text-lg mb-2">Create New Project</h3>
            <p className={`text-xs mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Add a new construction or operations project to the system.</p>
            
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Project Name</label>
                <input 
                  type="text" 
                  value={newProject.name} 
                  onChange={e => setNewProject({...newProject, name: e.target.value})}
                  placeholder="e.g. Solar Substation Beta"
                  className={`w-full px-3 py-2 rounded-xl border text-sm ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Client Name</label>
                <input 
                  type="text" 
                  value={newProject.client} 
                  onChange={e => setNewProject({...newProject, client: e.target.value})}
                  placeholder="e.g. Apex Energy Inc"
                  className={`w-full px-3 py-2 rounded-xl border text-sm ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Budget</label>
                <input 
                  type="text" 
                  value={newProject.budget} 
                  onChange={e => setNewProject({...newProject, budget: e.target.value})}
                  placeholder="e.g. $3.5M"
                  className={`w-full px-3 py-2 rounded-xl border text-sm ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Site Supervisor</label>
                <input 
                  type="text" 
                  value={newProject.supervisor} 
                  onChange={e => setNewProject({...newProject, supervisor: e.target.value})}
                  placeholder="e.g. Marcus Vance"
                  className={`w-full px-3 py-2 rounded-xl border text-sm ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsProjectModalOpen(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium border ${darkMode ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'}`}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Fleet Modal */}
      {isFleetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="font-bold text-lg mb-2">Register Fleet Asset</h3>
            <p className={`text-xs mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Add machinery or transport vehicle to telemetry tracker.</p>
            
            <form onSubmit={handleAddFleet} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Vehicle / Asset Name</label>
                <input 
                  type="text" 
                  value={newFleet.name} 
                  onChange={e => setNewFleet({...newFleet, name: e.target.value})}
                  placeholder="e.g. Volvo EC380 Excavator"
                  className={`w-full px-3 py-2 rounded-xl border text-sm ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Asset Type</label>
                <input 
                  type="text" 
                  value={newFleet.type} 
                  onChange={e => setNewFleet({...newFleet, type: e.target.value})}
                  placeholder="e.g. Heavy Machinery"
                  className={`w-full px-3 py-2 rounded-xl border text-sm ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Assigned Project</label>
                <input 
                  type="text" 
                  value={newFleet.project} 
                  onChange={e => setNewFleet({...newFleet, project: e.target.value})}
                  placeholder="e.g. Metro Expansion Phase 2"
                  className={`w-full px-3 py-2 rounded-xl border text-sm ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Assigned Operator</label>
                <input 
                  type="text" 
                  value={newFleet.operator} 
                  onChange={e => setNewFleet({...newFleet, operator: e.target.value})}
                  placeholder="e.g. John Doe"
                  className={`w-full px-3 py-2 rounded-xl border text-sm ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsFleetModalOpen(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium border ${darkMode ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'}`}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-cyan-600 text-white hover:bg-cyan-500 shadow-md shadow-cyan-600/30"
                >
                  Register Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Record Modal */}
      {isRecordModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md p-6 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'}`}>
            <h3 className="font-bold text-lg mb-2">Log Daily Operation Record</h3>
            <p className={`text-xs mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Record progress updates, material deployments, or safety notes.</p>
            
            <form onSubmit={handleAddRecord} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Record Type</label>
                <select 
                  value={newRecord.type} 
                  onChange={e => setNewRecord({...newRecord, type: e.target.value})}
                  className={`w-full px-3 py-2 rounded-xl border text-sm ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}
                >
                  <option value="Daily Operation">Daily Operation</option>
                  <option value="Material Deployment">Material Deployment</option>
                  <option value="Fleet Maintenance">Fleet Maintenance</option>
                  <option value="Safety Audit">Safety Audit</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Target Project</label>
                <input 
                  type="text" 
                  value={newRecord.project} 
                  onChange={e => setNewRecord({...newRecord, project: e.target.value})}
                  placeholder="e.g. Metro Expansion Phase 2"
                  className={`w-full px-3 py-2 rounded-xl border text-sm ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Operational Summary</label>
                <textarea 
                  rows="3"
                  value={newRecord.summary} 
                  onChange={e => setNewRecord({...newRecord, summary: e.target.value})}
                  placeholder="Describe milestones, material counts, or equipment status..."
                  className={`w-full px-3 py-2 rounded-xl border text-sm ${darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-black'}`}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsRecordModalOpen(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium border ${darkMode ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'}`}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-medium bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
                >
                  Submit Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}