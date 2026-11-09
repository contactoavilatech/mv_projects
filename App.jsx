import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, FolderKanban, Truck, ShieldAlert, History, 
  Sun, Moon, UserCheck, Plus, Trash2, RotateCcw, 
  CheckCircle2, AlertTriangle, Fuel, Activity, Layers, Globe, MapPin, Wrench
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
      projects: "Projects & Inputs",
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
    projectsHeader: "Projects & Field Inputs",
    projectsSub: "Manage regional deployment budgets, site locations, and execution milestones.",
    newProjectBtn: "New Project Input",
    viewerRestricted: "Viewer mode: Input creation restricted",
    lead: "Lead",
    site: "Site",
    budget: "Budget",
    progress: "Progress",
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
      projects: "Proyectos y Entradas",
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
    projectsHeader: "Gestión de Proyectos y Entradas",
    projectsSub: "Administre presupuestos de despliegue regional, ubicaciones y hitos de ejecución.",
    newProjectBtn: "Nueva Entrada de Proyecto",
    viewerRestricted: "Modo visualizador: Creación restringida",
    lead: "Líder",
    site: "Sitio",
    budget: "Presupuesto",
    progress: "Progreso",
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
  const [lang, setLang] = useState('es'); // Default to Spanish as requested
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

  // Data States (Updated with Avila Tech project context)
  const [projects, setProjects] = useState([
    { id: 1, name: 'Avila Tech Backbone Fiber Expansion', site: 'Caracas (Chacao / Baruta)', budget: '$45,000', status: 'Active', progress: 78, lead: 'Cipriano Villalba' },
    { id: 2, name: 'Regional Microwave Link Upgrade', site: 'Oriente (Puerto La Cruz)', budget: '$120,000', status: 'In Progress', progress: 42, lead: 'Yenson Bause' },
    { id: 3, name: 'Cojedes Infrastructure Node Integration', site: 'Cojedes / Yaritagua', budget: '$28,000', status: 'Planning', progress: 15, lead: 'Oscar Morales' }
  ]);

  const [fleet, setFleet] = useState([
    { id: 101, unit: 'Truck 04 - Ford F-350', project: 'Avila Tech Backbone', site: 'Caracas Norte', fuel: '75%', hours: '1,420 hrs', status: 'Deployed' },
    { id: 102, unit: 'Crane Rig 02 - Isuzu', project: 'Microwave Link Upgrade', site: 'Puerto La Cruz', fuel: '40%', hours: '3,100 hrs', status: 'Active' },
    { id: 103, unit: 'Service Van 08 - HiAce', project: 'Cojedes Node', site: 'Cojedes', fuel: '90%', hours: '850 hrs', status: 'Standby' }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 1, timestamp: '2026-11-08 08:30', user: 'Cipriano Villalba', action: 'Initialized Avila Tech Backbone telemetry sync', category: 'Operations' }
  ]);

  const [trashBin, setTrashBin] = useState([]);

  // Modals
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showFleetModal, setShowFleetModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', site: '', budget: '', lead: '' });
  const [newFleet, setNewFleet] = useState({ unit: '', project: '', site: '', fuel: '100%', hours: '0 hrs' });

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.name) return;
    const item = { id: Date.now(), ...newProject, status: 'Active', progress: 0 };
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
    setProjects([{ id: item.id, name: item.name, site: item.site, budget: item.budget, status: item.status, progress: item.progress, lead: item.lead }, ...projects]);
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

        {/* TAB 2: PROJECTS & INPUTS */}
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
              {projects.map(proj => (
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
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1 font-medium">
                        <span className="text-slate-400">{dict.progress}</span>
                        <span>{proj.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${proj.progress}%` }}></div>
                      </div>
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
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FLEET TELEMETRY */}
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

        {/* TAB 4: AUDIT & TRASH */}
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