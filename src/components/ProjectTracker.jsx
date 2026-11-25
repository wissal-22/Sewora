import React, { useState } from 'react';
import { PlusIcon, TrashIcon, FolderCheckIcon } from './Icons';

export default function ProjectTracker({
  projects,
  profiles,
  garments,
  onSaveProject,
  onDeleteProject,
  onUpdateStatus
}) {
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  const [title, setTitle] = useState('');
  const [garmentId, setGarmentId] = useState(garments[0]?.id || 'moroccan-kaftan');
  const [profileId, setProfileId] = useState(profiles[0]?.id || '');
  const [fabricName, setFabricName] = useState('');
  const [size, setSize] = useState('M');
  const [costEstimate, setCostEstimate] = useState('45.00');
  const [dueDate, setDueDate] = useState('2026-12-10');
  const [status, setStatus] = useState('Planned');
  const [notes, setNotes] = useState('');

  const statuses = ['All', 'Planned', 'Cutting', 'Sewing', 'Finished'];

  const filteredProjects = projects.filter((p) => {
    if (statusFilter === 'All') return true;
    return p.status === statusFilter;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    const matchedProfile = profiles.find((p) => p.id === profileId);

    const newProject = {
      id: `proj-${Date.now()}`,
      title: title.trim() || 'Untitled Sewing Project',
      garmentId,
      profileId,
      profileName: matchedProfile?.name || 'Custom',
      fabricName: fabricName.trim() || 'Unspecified Fabric',
      size,
      costEstimate: parseFloat(costEstimate) || 0,
      dueDate,
      status,
      notes: notes.trim(),
      progress: status === 'Finished' ? 100 : status === 'Sewing' ? 65 : status === 'Cutting' ? 35 : 10
    };

    onSaveProject(newProject);
    setShowModal(false);
    setTitle('');
    setFabricName('');
    setNotes('');
  };

  const getStatusColor = (st) => {
    switch (st) {
      case 'Finished':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
      case 'Sewing':
        return 'bg-[#d4af37]/20 text-[#fceec5] border-[#d4af37]/60';
      case 'Cutting':
        return 'bg-sky-950/80 text-sky-300 border-sky-500/40';
      default:
        return 'bg-stone-900 text-stone-300 border-stone-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-[#121217] border border-[#d4af37]/25 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <FolderCheckIcon className="w-5 h-5 text-[#d4af37]" />
            Atelier Project & Order Tracker
          </h3>
          <p className="text-xs text-stone-400 mt-0.5">
            Manage your tailoring queue, project milestones, due dates, and haberdashery costs.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#d4af37] via-[#e5c07b] to-[#b89228] hover:opacity-95 text-[#0c0c0e] rounded-xl text-xs font-bold shadow-md shadow-[#d4af37]/20 transition-all cursor-pointer"
        >
          <PlusIcon className="w-4 h-4" />
          Create New Project
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {statuses.map((st) => {
          const isActive = statusFilter === st;
          const count = st === 'All' ? projects.length : projects.filter((p) => p.status === st).length;
          return (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#0c0c0e] font-bold shadow-md'
                  : 'bg-[#15151e] text-stone-300 border border-stone-800 hover:border-stone-700'
              }`}
            >
              <span>{st}</span>
              <span className="text-[10px] font-mono opacity-80">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-[#121217] rounded-3xl border border-[#d4af37]/20 p-8 space-y-3">
          <FolderCheckIcon className="w-12 h-12 text-[#d4af37]/40 mx-auto" />
          <h4 className="text-lg font-serif font-bold text-white">
            No projects in this stage
          </h4>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Ready to plan your next garment? Click "Create New Project" to budget your fabric and schedule your cutting day.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const garment = garments.find((g) => g.id === project.garmentId) || garments[0];

            return (
              <div
                key={project.id}
                className="bg-[#121217] border border-[#d4af37]/25 rounded-3xl p-6 shadow-xl space-y-4 flex flex-col justify-between hover:border-[#d4af37]/60 transition-all relative overflow-hidden group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => onDeleteProject(project.id)}
                      className="text-stone-500 hover:text-red-400 transition-colors p-1"
                      title="Delete project"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="text-lg font-serif font-bold text-white leading-snug group-hover:text-[#fceec5] transition-colors">
                    {project.title}
                  </h4>

                  <div className="text-xs text-stone-300 space-y-1.5 font-sans">
                    <div>
                      <strong className="text-[#fceec5]">Pattern:</strong> {garment.name} (Size {project.size})
                    </div>
                    <div>
                      <strong className="text-[#fceec5]">Fabric:</strong> {project.fabricName}
                    </div>
                    <div>
                      <strong className="text-[#fceec5]">Profile:</strong> {project.profileName}
                    </div>
                  </div>

                  {/* Stepper Progress Bar (Inspired by My Orders reference screen) */}
                  <div className="pt-2">
                    <div className="flex justify-between text-[10px] font-mono text-stone-400 mb-1">
                      <span>Progress</span>
                      <span className="text-[#d4af37] font-bold">{project.progress || 20}%</span>
                    </div>
                    <div className="w-full bg-[#1e1e28] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#d4af37] to-[#e5c07b] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress || 20}%` }}
                      />
                    </div>
                  </div>

                  {project.notes && (
                    <p className="text-xs text-stone-400 italic bg-[#181822] border border-stone-800/80 p-3 rounded-xl leading-relaxed">
                      "{project.notes}"
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-stone-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
                    <span className="text-white font-bold">${project.costEstimate?.toFixed(2)}</span>
                    <span>Due: {project.dueDate || 'Flexible'}</span>
                  </div>

                  {/* Stage Dropdown */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#d4af37] font-bold mb-1">
                      Update Stage
                    </label>
                    <select
                      value={project.status}
                      onChange={(e) => onUpdateStatus(project.id, e.target.value)}
                      className="w-full text-xs bg-[#1a1a26] border border-stone-700 rounded-xl p-2.5 text-stone-200 font-medium focus:outline-none focus:ring-1 focus:ring-[#d4af37]"
                    >
                      <option value="Planned">Planned</option>
                      <option value="Cutting">Cutting</option>
                      <option value="Sewing">Sewing</option>
                      <option value="Finished">Finished</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#14141c] border border-[#d4af37]/30 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-serif font-bold text-white mb-1">
              Add New Project to Queue
            </h3>
            <p className="text-xs text-stone-400 mb-5 leading-relaxed">
              Enter garment type, fabric details, budget estimate, and target completion date.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#fceec5] mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Royal Emerald Velvet Djellaba"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-700 bg-[#1c1c28] text-white focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#fceec5] mb-1">
                    Garment Pattern
                  </label>
                  <select
                    value={garmentId}
                    onChange={(e) => setGarmentId(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-700 bg-[#1c1c28] text-white focus:outline-none"
                  >
                    {garments.map((g) => (
                      <option key={g.id} value={g.id} className="bg-[#121217]">
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#fceec5] mb-1">
                    Client Profile
                  </label>
                  <select
                    value={profileId}
                    onChange={(e) => setProfileId(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-700 bg-[#1c1c28] text-white focus:outline-none"
                  >
                    {profiles.map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#121217]">
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#fceec5] mb-1">
                  Fabric Type & Name
                </label>
                <input
                  type="text"
                  value={fabricName}
                  onChange={(e) => setFabricName(e.target.value)}
                  placeholder="e.g. Pure Silk Crepe, 100% Washed Linen"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-700 bg-[#1c1c28] text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#fceec5] mb-1">
                    Size
                  </label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    placeholder="M"
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-700 bg-[#1c1c28] text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#fceec5] mb-1">
                    Stage
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full text-xs px-2 py-2.5 rounded-xl border border-stone-700 bg-[#1c1c28] text-white focus:outline-none"
                  >
                    <option value="Planned">Planned</option>
                    <option value="Cutting">Cutting</option>
                    <option value="Sewing">Sewing</option>
                    <option value="Finished">Finished</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#fceec5] mb-1">
                    Cost ($)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={costEstimate}
                    onChange={(e) => setCostEstimate(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-700 bg-[#1c1c28] text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#fceec5] mb-1">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full text-xs px-2 py-2.5 rounded-xl border border-stone-700 bg-[#1c1c28] text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#fceec5] mb-1">
                  Project Notes & Sewing Plan
                </label>
                <textarea
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Using French seams for delicate side seams; adding gold Sfifa along cuffs."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-700 bg-[#1c1c28] text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-stone-700 text-stone-300 hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#0c0c0e] hover:opacity-95 shadow-md"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
