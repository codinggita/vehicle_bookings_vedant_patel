import { memo } from 'react';

/**
 * ProfileAvatar Component
 * Premium avatar visual display with colored initials and upload overlay effects.
 * 
 * @param {Object} props
 * @param {string} props.name - User full name
 * @param {string} props.email - User email address
 */
const ProfileAvatar = memo(({ name, email }) => {
  const initial = name ? name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group cursor-pointer">
        {/* Avatar circle */}
        <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 text-white flex items-center justify-center font-black text-3.5xl shadow-xl shadow-indigo-500/20 border-2 border-indigo-400/20 select-none transition-transform duration-300 group-hover:scale-105">
          {initial}
        </div>
        
        {/* Hover Upload icon */}
        <div className="absolute inset-0 rounded-2xl bg-slate-950/70 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 border border-indigo-500/30">
          <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-base font-bold text-slate-200 select-none">
          {name || 'User Profile'}
        </h3>
        <p className="text-xs text-slate-500 font-semibold mt-0.5 select-all">
          {email}
        </p>
      </div>
    </div>
  );
});

export default ProfileAvatar;
