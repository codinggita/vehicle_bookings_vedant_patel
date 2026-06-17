/**
 * ProfileCard Component
 * Displays read-only profile detail rows with badges and metadata.
 * 
 * @param {Object} props
 * @param {Object} props.profile - User profile info
 */
const ProfileCard = ({ profile }) => {
  
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const getRoleBadge = (role) => {
    const isAdmin = role === 'admin';
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
        isAdmin 
          ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400'
          : 'bg-slate-800 border border-slate-700 text-slate-300'
      }`}>
        {role || 'user'}
      </span>
    );
  };

  const getStatusBadge = (isActive) => {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
        isActive
          ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
          : 'bg-red-500/10 border border-red-500/20 text-red-400'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-red-400'}`} />
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  const infoRows = [
    { label: 'Role', value: getRoleBadge(profile?.role) },
    { label: 'Account Status', value: getStatusBadge(profile?.isActive !== false) },
    { label: 'Phone Number', value: profile?.phone || <span className="text-slate-600 italic">Not Provided</span> },
    { label: 'Member Since', value: formatDate(profile?.createdAt) },
  ];

  return (
    <div className="space-y-6">
      
      {/* Bio / Bio Information Section */}
      <div className="bg-slate-950/30 border border-slate-800/60 rounded-xl p-4.5">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          Bio / Profile Info
        </h4>
        <p className="text-sm text-slate-300 leading-relaxed min-h-[50px]">
          {profile?.bio || 'No profile bio provided yet.'}
        </p>
      </div>

      {/* Grid List Rows */}
      <div className="divide-y divide-slate-800/40 border-t border-b border-slate-800/40">
        {infoRows.map((row, idx) => (
          <div key={idx} className="flex justify-between items-center py-3.5 text-sm select-none">
            <span className="font-semibold text-slate-500">{row.label}</span>
            <span className="font-bold text-slate-200">{row.value}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProfileCard;
