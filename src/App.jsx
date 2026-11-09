import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FolderKanban, Truck, ShieldAlert, History, 
  Sun, Moon, UserCheck, Plus, Trash2, RotateCcw, 
  CheckCircle2, AlertTriangle, Fuel, Activity, Layers, Globe, MapPin, Wrench,
  CalendarDays, CheckSquare, Clock, ChevronRight, BarChart3
} from 'lucide-react';

// Bilingual Dictionary
const t = {
  en: {
    title: "Command Center OS",
    subtitle: "Project, Fleet & Operations Hub",
    profile: "Profile:",
    admin: "Administrator",
    manager: "Project Manager",
    viewer: "Viewer (Read-Only)",
    tabs: {
      dashboard: "Dashboard",
      gantt: "Weekly Gantt Timeline",
      projects: "Projects & Tasks",
      fleet: "Fleet Telemetry",
      archive: "Audit & Trash"
    },
    kpi: {
      activeProjects: "ACTIVE PROJECTS",
      operationalSync: "100% Operational Sync",
      fleetDeployed: "FLEET DEPLOYED",
      telemetryConnected: "Telemetry Connected",
      currentProfile: "CURRENT PROFILE",
      permissionsActive: "Permissions Active",
      activeCrews: "ACTIVE FIELD CREWS",
      deployedRegions: "Regions: Oriente, Cojedes, Caracas"
    },
    activityLog: "Recent Operational Activity Log",
    ganttHeader: "Current Week Operational Gantt Chart",
    ganttSub: "7-day deployment schedule mapping field crews, site installations, and microwave alignment.",
    today: "Today",
    weekDays: ["Mon 09", "Tue 10", "Wed 11", "Thu 12", "Fri 13", "Sat 14", "Sun 15"],
    projectsHeader: "Projects & Task Execution (Asana-Style)",
    projectsSub: "Track multi-stage task lists, site milestones, and completion percentages.",
    newProjectBtn: "New Project Input",
    viewerRestricted: "Viewer mode: Input creation restricted",
    lead: "Lead",
    site: "Site",
    budget: "Budget",
    progress: "Overall Progress",
    tasks: "Milestone Sub-Tasks",
    addTaskPlaceholder: "Add new task item...",
    softDelete: "Soft Delete",
    fleetHeader: "Fleet & Asset Telemetry",
    fleetSub: "Track field vehicles, fuel levels, maintenance hours, and active assignments.",
    registerFleetBtn: "Register Fleet Asset",
    unitAsset: "Unit Asset",
    assignedProject: "Assigned Project",
    fuelLevel: "Fuel Level",
    opHours: "Operation Hours",
    status: "Status",
    trashHeader: "Compliance Trash Bin & Audit Trail",
    trashSub: "Soft-deleted items are safely archived here. Administrators can restore records anytime.",
    deletedRecords: "Soft-Deleted Records",
    noDeleted: "No soft-deleted records in the trash bin.",
    restoreRecord: "Restore Record",
    cancel: "Cancel",
    saveProject: "Save Project",
    registerUnit: "Register Unit",
    projectName: "Project Name",
    projectLead: "Project Lead",
    siteLocation: "Site Location",
    unitName: "Unit Asset Name"
  },
  es: {
    title: "Centro de Mando OS",
    subtitle: "Gestión de Proyectos, Flota y Operaciones",
    profile: "Perfil:",
    admin: "Administrador",
    manager: "Gerente de Proyecto",
    viewer: "Visualizador (Solo Lectura)",
    tabs: {
      dashboard: "Tablero",
      gantt: "Diagrama de Gantt Semanal",
      projects: "Proyectos y Tareas",
      fleet: "Telemetría de Flota",
      archive: "Auditoría y Papelera"
    },
    kpi: {
      activeProjects: "PROYECTOS ACTIVOS",
      operationalSync: "Sincronización Operativa 100%",
      fleetDeployed: "FLOTA DESPLEGADA",
      telemetryConnected: "Telemetría Conectada",
      currentProfile: "PERFIL ACTUAL",
      permissionsActive: "Permisos Activos",
      activeCrews: "CUADRILLAS ACTIVAS",
      deployedRegions: "Regiones: Oriente, Cojedes, Caracas"
    },
    activityLog: "Registro de Actividad Operativa Reciente",
    ganttHeader: "Diagrama de Gantt Operativo - Semana Actual",
    ganttSub: "Cronograma de 7 días para cuadrillas de campo, enlaces de microondas e instalaciones de fibra.",
    today: "Hoy",
    weekDays: ["Lun 09", "Mar 10", "Mié 11", "Jue 12", "Vie 13", "Sáb 14", "Dom 15"],
    projectsHeader: "Gestión de Proyectos y Tareas (Estilo Asana)",
    projectsSub: "Supervise listas de tareas por hitos, avances de campo y porcentaje de ejecución.",
    newProjectBtn: "Nueva Entrada de Proyecto",
    viewerRestricted: "Modo visualizador: Creación restringida",
    lead: "Líder",
    site: "Sitio",
    budget: "Presupuesto",
    progress: "Avance General",
    tasks: "Sub-tareas / Hitos",
    addTaskPlaceholder: "Agregar nueva tarea...",
    softDelete: "Eliminación Suave",
    fleetHeader: "Telemetría de Flota y Activos",
    fleetSub: "Monitoree vehículos de campo, niveles de combustible, horas de mantenimiento y asignaciones.",
    registerFleetBtn: "Registrar Activo de Flota",
    unitAsset: "Activo / Unidad",
    assignedProject: "Proyecto Asignado",
    fuelLevel: "Nivel de Combustible",
    opHours: "Horas de Operación",
    status: "Estado",
    trashHeader: "Papelera de Cumplimiento y Auditoría",
    trashSub: "Los elementos eliminados se archivan de forma segura. Los administradores pueden restaurarlos.",
    deletedRecords: "Registros Eliminados (Papelera)",
    noDeleted: "No hay registros eliminados en la papelera.",
    restoreRecord: "Restaurar Registro",
    cancel: "Cancelar",
    saveProject: "Guardar Proyecto",
    registerUnit: "Registrar Unidad",
    projectName: "Nombre del Proyecto",
    projectLead: "Líder de Proyecto",
    siteLocation: "Ubicación / Sitio",
    unitName: "Nombre del Activo"
  }
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState('es');
  const [activeRole, setActiveRole] = useState('Administrator');
  const [activeTab, setActiveTab] = useState('dashboard');

  const dict = t[lang];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Projects State with Asana-Style Tasks & Gantt Bar Positioning
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      name: 'Avila Tech Backbone Fiber Expansion', 
      site: 'Caracas (Chacao / Baruta)', 
      budget: '$45,000', 
      status: 'Active', 
      lead: 'Cipriano Villalba',
      ganttSpan: { startCol: 1, spanCol: 5 }, // Mon to Fri
      tasks: [
        { id: 101, title: 'COSSNA Safety Certification & Field Permits', completed: true },
        { id: 102, title: 'Trenching & Fiber Duct Installation', completed: true },
        { id: 103, title: 'Fusion Splicing & OTDR Testing', completed: false },
        { id: 104, title: 'Final Client Protocol Sign-off', completed: false }
      ]
    },
    { 
      id: 2, 
      name: 'Regional Microwave Link Upgrade', 
      site: 'Oriente (Puerto La Cruz)', 
      budget: '$120,000', 
      status: 'In Progress', 
      lead: 'Yenson Bause',
      ganttSpan: { startCol: 2, spanCol: 4 }, // Tue to Fri
      tasks: [
        { id: 201, title: 'Tower Rigging & Structural Inspection', completed: true },
        { id: 202, title: 'Dish Antenna Mounting & Cabling', completed: false },
        { id: 203, title: 'Frequency Alignment & Power Calibration', completed: false }
      ]
    },
    { 
      id: 3, 
      name: 'Cojedes Infrastructure Node Integration', 
      site: 'Cojedes / Yaritagua', 
      budget: '$28,000', 
      status: 'Planning', 
      lead: 'Oscar Morales',
      ganttSpan: { startCol: 4, spanCol: 3 }, // Thu to Sat
      tasks: [
        { id: 301, title: 'Site Survey & Logistics Procurement', completed: true },
        { id: 302, title: 'Backup Generator & UPS Rack Installation', completed: false }
      ]
    }
  ]);

  const [fleet, setFleet] = useState([
    { id: 101, unit: 'Truck 04 - Ford F-350', project: 'Avila Tech Backbone', site: 'Caracas Norte', fuel: '75%', hours: '1,420 hrs', status: 'Deployed' },
    { id: 102, unit: 'Crane Rig 02 - Isuzu', project: 'Microwave Link Upgrade', site: 'Puerto La Cruz', fuel: '40%', hours: '3,100 hrs', status: 'Active' },
    { id: 103, unit: 'Service Van 08 - HiAce', project: 'Cojedes Node', site: 'Cojedes', fuel: '90%', hours: '850 hrs', status: 'Standby' }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 1, timestamp: '2026-11-08 08:30', user: 'Cipriano Villalba', action: 'Initialized weekly Gantt schedule & task workflow', category: 'Operations' }
  ]);

  const [trashBin, setTrashBin] = useState([]);

  // Modals & Dynamic Task Additions
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showFleetModal, setShowFleetModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', site: '', budget: '', lead: '' });
  const [newFleet, setNewFleet] = useState({ unit: '', project: '', site: '', fuel: '100%', hours: '0 hrs' });
  const [newTaskInput, setNewTaskInput] = useState({});

  // Calculate dynamic project progress percentage based on task completion
  const getProjectProgress = (tasks) => {
    if (!tasks || tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const toggleTask = (projectId, taskId) => {
    setProjects(projects.map(p => {
      if (p.id === projectId) {
        const updatedTasks = p.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
        return { ...p, tasks: updatedTasks };
      }
      return p;
    }));
  };

  const handleAddTask = (projectId) => {
    const title = newTaskInput[projectId];
    if (!title) return;

    setProjects(projects.map(p => {
      if (p.id === projectId) {
        return { ...p, tasks: [...p.tasks, { id: Date.now(), title, completed: false }] };
      }
      return p;
    }));

    setNewTaskInput({ ...newTaskInput, [projectId]: '' });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.name) return;
    const item = { 
      id: Date.now(), 
      ...newProject, 
      status: 'Active', 
      ganttSpan: { startCol: 1, spanCol: 5 },
      tasks: [
        { id: Date.now() + 1, title: 'Initial Mobilization & Equipment Dispatch', completed: false }
      ]
    };
    setProjects([item, ...projects]);
    setAuditLogs([{ id: Date.now(), timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), user: activeRole, action: `Created project "${newProject.name}"`, category: 'Project' }, ...auditLogs]);
    setNewProject({ name: '', site: '', budget: '', lead: '' });
    setShowProjectModal(false);
  };

  const handleAddFleet = (e) => {
    e.preventDefault();
    if (!newFleet.unit) return;
    const item = { id: Date.now(), ...newFleet, status: 'Active' };
    setFleet([item, ...fleet]);
    setAuditLogs([{ id: Date.now(), timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), user: activeRole, action: `Registered fleet unit "${newFleet.unit}"`, category: 'Fleet' }, ...auditLogs]);
    setNewFleet({ unit: '', project: '', site: '', fuel: '100%', hours: '0 hrs' });
    setShowFleetModal(false);
  };

  const softDeleteProject = (id) => {
    const target = projects.find(p => p.id === id);
    if (!target) return;
    setProjects(projects.filter(p => p.id !== id));
    setTrashBin([{ ...target, type: 'Project', deletedAt: new Date().toLocaleString() }, ...trashBin]);
    setAuditLogs([{ id: Date.now(), timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16), user: activeRole, action: `Soft-deleted project "${target.name}"`, category: 'Archive' }, ...auditLogs]);
  };

  const restoreProject = (item) => {
    setTrashBin(trashBin.filter(t => t.id !== item.id));
    setProjects([{ id: item.id, name: item.name, site: item.site, budget: item.budget, status: item.status, ganttSpan: item.ganttSpan || { startCol: 1, spanCol: 4 }, tasks: item.tasks || [], lead: item.lead }, ...projects]);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* Header */}
      <header className="border-b border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 text-white p-2 rounded-lg font-bold flex items-center justify-center shadow-md shadow-indigo-600/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight">{dict.title}</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Avila Tech Field Operations</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs">
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              <button 
                onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                className="font-bold hover:text-indigo-500 transition uppercase px-1"
              >
                {lang}
              </button>
            </div>

            {/* Role Switcher */}
            <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700">
              <UserCheck className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{dict.profile}</span>
              <select 
                value={activeRole} 
                onChange={(e) => setActiveRole(e.target.value)}
                className="bg-transparent text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="Administrator" className="dark:bg-slate-900">{dict.admin}</option>
                <option value="Project Manager" className="dark:bg-slate-900">{dict.manager}</option>
                <option value="Viewer" className="dark:bg-slate-900">{dict.viewer}</option>
              </select>
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex space-x-2 border-b border-slate-300 dark:border-slate-800 pb-4 mb-8 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{dict.tabs.dashboard}</span>
          </button>
          <button 
            onClick={() => setActiveTab('gantt')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'gantt' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800'}`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>{dict.tabs.gantt}</span>
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'projects' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800'}`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>{dict.tabs.projects}</span>
          </button>
          <button 
            onClick={() => setActiveTab('fleet')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'fleet' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800'}`}
          >
            <Truck className="w-4 h-4" />
            <span>{dict.tabs.fleet}</span>
          </button>
          <button 
            onClick={() => setActiveTab('archive')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'archive' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800'}`}
          >
            <History className="w-4 h-4" />
            <span>{dict.tabs.archive}</span>
          </button>
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-300 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{dict.kpi.activeProjects}</span>
                  <FolderKanban className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="text-2xl font-bold mt-2">{projects.length}</div>
                <p className="text-xs text-emerald-500 mt-1 font-medium">{dict.kpi.operationalSync}</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-300 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{dict.kpi.fleetDeployed}</span>
                  <Truck className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="text-2xl font-bold mt-2">{fleet.length} Units</div>
                <p className="text-xs text-emerald-500 mt-1 font-medium">{dict.kpi.telemetryConnected}</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-300 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{dict.kpi.activeCrews}</span>
                  <Wrench className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="text-2xl font-bold mt-2">12 Active</div>
                <p className="text-xs text-indigo-400 mt-1 font-medium">{dict.kpi.deployedRegions}</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-300 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{dict.kpi.currentProfile}</span>
                  <UserCheck className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="text-lg font-bold mt-2 truncate">{activeRole}</div>
                <p className="text-xs text-indigo-400 mt-1 font-medium">{dict.kpi.permissionsActive}</p>
              </div>
            </div>

            {/* Quick Gantt Preview */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold flex items-center space-x-2">
                  <CalendarDays className="w-4 h-4 text-indigo-500" />
                  <span>{dict.ganttHeader}</span>
                </h3>
                <button 
                  onClick={() => setActiveTab('gantt')}
                  className="text-xs font-semibold text-indigo-500 hover:text-indigo-400 flex items-center space-x-1"
                >
                  <span>Full View</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                {dict.weekDays.map((day, idx) => (
                  <div key={idx} className={idx === 0 ? "text-indigo-500 font-bold" : ""}>
                    {day}
                  </div>
                ))}
              </div>
              <div className="space-y-3 mt-4">
                {projects.map(proj => {
                  const progress = getProjectProgress(proj.tasks);
                  return (
                    <div key={proj.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold truncate max-w-[200px]">{proj.name}</span>
                        <span className="text-slate-400 font-mono">{progress}%</span>
                      </div>
                      <div className="grid grid-cols-7 gap-2 h-7 bg-slate-50 dark:bg-slate-800/40 rounded-lg p-1 border border-slate-200 dark:border-slate-800/60">
                        <div 
                          className="bg-indigo-600 rounded flex items-center px-2 text-[10px] font-bold text-white shadow-sm transition-all"
                          style={{
                            gridColumnStart: proj.ganttSpan.startCol,
                            gridColumnEnd: `span ${proj.ganttSpan.spanCol}`
                          }}
                        >
                          <span className="truncate">{proj.site}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-base font-bold mb-4 flex items-center space-x-2">
                <Activity className="w-4 h-4 text-indigo-500" />
                <span>{dict.activityLog}</span>
              </h3>
              <div className="space-y-3">
                {auditLogs.slice(0, 5).map(log => (
                  <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex items-center space-x-3">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-semibold">{log.category}</span>
                      <span>{log.action}</span>
                    </div>
                    <div className="text-slate-400 space-x-4">
                      <span>By {log.user}</span>
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FULL GANTT TIMELINE */}
        {activeTab === 'gantt' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold">{dict.ganttHeader}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{dict.ganttSub}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 p-6 shadow-sm overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Header Row */}
                <div className="grid grid-cols-12 gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs font-bold text-slate-400">
                  <div className="col-span-4">Project & Site</div>
                  <div className="col-span-8 grid grid-cols-7 text-center">
                    {dict.weekDays.map((day, idx) => (
                      <div key={idx} className={idx === 0 ? "text-indigo-500" : ""}>{day}</div>
                    ))}
                  </div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-slate-200 dark:divide-slate-800/60">
                  {projects.map(proj => {
                    const progress = getProjectProgress(proj.tasks);
                    return (
                      <div key={proj.id} className="grid grid-cols-12 gap-2 py-4 items-center">
                        <div className="col-span-4">
                          <h4 className="font-bold text-xs truncate">{proj.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-[10px] text-indigo-400 flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{proj.site}</span>
                            </span>
                            <span className="text-[10px] text-slate-400">| Lead: {proj.lead}</span>
                          </div>
                        </div>

                        <div className="col-span-8 grid grid-cols-7 gap-2 h-9 bg-slate-50 dark:bg-slate-800/30 rounded-lg p-1 relative">
                          <div 
                            className="bg-indigo-600 hover:bg-indigo-500 transition-colors rounded-md flex items-center justify-between px-3 text-xs font-semibold text-white shadow-md cursor-pointer"
                            style={{
                              gridColumnStart: proj.ganttSpan.startCol,
                              gridColumnEnd: `span ${proj.ganttSpan.spanCol}`
                            }}
                          >
                            <span className="truncate">{proj.name}</span>
                            <span className="bg-black/30 px-1.5 py-0.5 rounded text-[10px] font-mono">{progress}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROJECTS & ASANA-STYLE TASKS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{dict.projectsHeader}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{dict.projectsSub}</p>
              </div>
              {activeRole !== 'Viewer' ? (
                <button 
                  onClick={() => setShowProjectModal(true)}
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold transition shadow-md shadow-indigo-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>{dict.newProjectBtn}</span>
                </button>
              ) : (
                <span className="text-xs text-amber-500 font-medium bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">{dict.viewerRestricted}</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map(proj => {
                const progress = getProjectProgress(proj.tasks);
                return (
                  <div key={proj.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{proj.status}</span>
                        <span className="text-xs font-bold text-slate-400">{proj.budget}</span>
                      </div>
                      <h4 className="font-bold text-base mt-2">{proj.name}</h4>
                      <p className="text-xs text-indigo-400 mt-1 flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{proj.site}</span>
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{dict.lead}: {proj.lead}</p>
                      
                      {/* Overall Progress Bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1 font-medium">
                          <span className="text-slate-400">{dict.progress}</span>
                          <span className="font-bold">{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>

                      {/* Asana-Style Task Checklist */}
                      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                        <h5 className="text-xs font-bold mb-3 flex items-center justify-between">
                          <span className="flex items-center space-x-1.5">
                            <CheckSquare className="w-3.5 h-3.5 text-indigo-500" />
                            <span>{dict.tasks}</span>
                          </span>
                          <span className="text-[10px] text-slate-400">{proj.tasks.filter(t => t.completed).length}/{proj.tasks.length}</span>
                        </h5>

                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {proj.tasks.map(task => (
                            <div 
                              key={task.id} 
                              onClick={() => activeRole !== 'Viewer' && toggleTask(proj.id, task.id)}
                              className={`flex items-start space-x-2.5 p-2 rounded-lg border text-xs cursor-pointer transition ${task.completed ? 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 line-through text-slate-400' : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 font-medium'}`}
                            >
                              <input 
                                type="checkbox" 
                                checked={task.completed} 
                                onChange={() => {}} // Handled by parent div click
                                className="mt-0.5 rounded accent-indigo-600 cursor-pointer" 
                              />
                              <span className="leading-tight">{task.title}</span>
                            </div>
                          ))}
                        </div>

                        {/* Add Task Input */}
                        {activeRole !== 'Viewer' && (
                          <div className="mt-3 flex space-x-2">
                            <input 
                              type="text" 
                              value={newTaskInput[proj.id] || ''} 
                              onChange={e => setNewTaskInput({ ...newTaskInput, [proj.id]: e.target.value })}
                              placeholder={dict.addTaskPlaceholder}
                              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                              onKeyDown={e => e.key === 'Enter' && handleAddTask(proj.id)}
                            />
                            <button 
                              onClick={() => handleAddTask(proj.id)}
                              className="bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {activeRole === 'Administrator' && (
                      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
                        <button 
                          onClick={() => softDeleteProject(proj.id)}
                          className="flex items-center space-x-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-lg transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{dict.softDelete}</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: FLEET TELEMETRY */}
        {activeTab === 'fleet' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{dict.fleetHeader}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{dict.fleetSub}</p>
              </div>
              {activeRole !== 'Viewer' && (
                <button 
                  onClick={() => setShowFleetModal(true)}
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold transition shadow-md shadow-indigo-600/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>{dict.registerFleetBtn}</span>
                </button>
              )}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-400">
                    <th className="p-4 font-semibold">{dict.unitAsset}</th>
                    <th className="p-4 font-semibold">{dict.assignedProject}</th>
                    <th className="p-4 font-semibold">Location / Site</th>
                    <th className="p-4 font-semibold">{dict.fuelLevel}</th>
                    <th className="p-4 font-semibold">{dict.opHours}</th>
                    <th className="p-4 font-semibold">{dict.status}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {fleet.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="p-4 font-bold flex items-center space-x-2">
                        <Truck className="w-4 h-4 text-indigo-500" />
                        <span>{item.unit}</span>
                      </td>
                      <td className="p-4 text-slate-400">{item.project}</td>
                      <td className="p-4 text-indigo-400">{item.site}</td>
                      <td className="p-4 font-semibold text-emerald-400">{item.fuel}</td>
                      <td className="p-4 text-slate-300">{item.hours}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: AUDIT & TRASH */}
        {activeTab === 'archive' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold">{dict.trashHeader}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{dict.trashSub}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 p-6 shadow-sm">
              <h4 className="text-sm font-bold mb-4 flex items-center space-x-2">
                <Trash2 className="w-4 h-4 text-rose-500" />
                <span>{dict.deletedRecords} ({trashBin.length})</span>
              </h4>
              {trashBin.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-4">{dict.noDeleted}</p>
              ) : (
                <div className="space-y-3">
                  {trashBin.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-rose-500/5 border border-rose-500/20 text-xs">
                      <div>
                        <span className="font-bold text-sm">{item.name}</span>
                        <p className="text-slate-400 mt-0.5">Deleted at: {item.deletedAt} | Budget: {item.budget}</p>
                      </div>
                      {activeRole === 'Administrator' && (
                        <button 
                          onClick={() => restoreProject(item)}
                          className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg font-semibold transition shadow"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{dict.restoreRecord}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* MODAL: NEW PROJECT */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-base font-bold mb-4">{dict.newProjectBtn}</h3>
            <form onSubmit={handleAddProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">{dict.projectName}</label>
                <input 
                  type="text" 
                  required
                  value={newProject.name} 
                  onChange={e => setNewProject({...newProject, name: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                  placeholder="e.g., Regional Microwave Link" 
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{dict.siteLocation}</label>
                <input 
                  type="text" 
                  required
                  value={newProject.site} 
                  onChange={e => setNewProject({...newProject, site: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                  placeholder="e.g., Oriente (Puerto La Cruz)" 
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{dict.budget}</label>
                <input 
                  type="text" 
                  required
                  value={newProject.budget} 
                  onChange={e => setNewProject({...newProject, budget: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                  placeholder="e.g., $35,000" 
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{dict.projectLead}</label>
                <input 
                  type="text" 
                  required
                  value={newProject.lead} 
                  onChange={e => setNewProject({...newProject, lead: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                  placeholder="e.g., Cipriano Villalba" 
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold"
                >
                  {dict.cancel}
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow"
                >
                  {dict.saveProject}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NEW FLEET UNIT */}
      {showFleetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-base font-bold mb-4">{dict.registerFleetBtn}</h3>
            <form onSubmit={handleAddFleet} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">{dict.unitName}</label>
                <input 
                  type="text" 
                  required
                  value={newFleet.unit} 
                  onChange={e => setNewFleet({...newFleet, unit: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                  placeholder="e.g., Truck 09 - Ford Ranger" 
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{dict.assignedProject}</label>
                <input 
                  type="text" 
                  required
                  value={newFleet.project} 
                  onChange={e => setNewFleet({...newFleet, project: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                  placeholder="e.g., Avila Tech Backbone" 
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">{dict.siteLocation}</label>
                <input 
                  type="text" 
                  required
                  value={newFleet.site} 
                  onChange={e => setNewFleet({...newFleet, site: e.target.value})}
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500" 
                  placeholder="e.g., Caracas / Oriente" 
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowFleetModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold"
                >
                  {dict.cancel}
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow"
                >
                  {dict.registerUnit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}