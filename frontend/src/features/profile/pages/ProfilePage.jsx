import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../store/profileThunks';
import ProfileAvatar from '../components/ProfileAvatar';
import ProfileCard from '../components/ProfileCard';
import ProfileForm from '../components/ProfileForm';

/**
 * ProfilePage Component
 * Main page container for displaying and updating user profile information.
 */
const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchProfile());
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto select-none">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-100 tracking-tight">
          Account Profile
        </h1>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Manage your personal details, biography, and credentials.
        </p>
      </div>

      {loading && !profile ? (
        // Loading state
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse select-none">
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 h-64 flex flex-col items-center justify-center gap-3">
            <div className="w-24 h-24 rounded-2xl bg-slate-800" />
            <div className="h-4 bg-slate-800 rounded-md w-32 mt-2" />
            <div className="h-3 bg-slate-800 rounded-md w-24" />
          </div>
          <div className="md:col-span-2 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <div className="h-20 bg-slate-800 rounded-xl" />
            <div className="space-y-2.5 pt-4">
              <div className="h-8 bg-slate-800 rounded-lg" />
              <div className="h-8 bg-slate-800 rounded-lg" />
              <div className="h-8 bg-slate-800 rounded-lg" />
            </div>
          </div>
        </div>
      ) : error ? (
        // Error state
        <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl p-12 text-center select-none">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h4 className="text-slate-200 font-bold">Failed to Load Profile</h4>
              <p className="text-xs text-slate-500 mt-1">{error}</p>
            </div>
            <button
              onClick={handleRetry}
              className="mt-2 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        // Profile Grid
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          
          {/* Column 1: Avatar Card */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-md backdrop-blur-md">
            <ProfileAvatar name={profile?.name} email={profile?.email} />
          </div>

          {/* Column 2: Information Details Panel */}
          <div className="md:col-span-2 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 shadow-md backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4 select-none">
              <h3 className="text-base font-bold text-slate-100">
                {isEditing ? 'Edit Profile Details' : 'Profile Information'}
              </h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-800 text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-800/80 transition-all duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <ProfileForm profile={profile} onCancel={() => setIsEditing(false)} />
            ) : (
              <ProfileCard profile={profile} />
            )}
          </div>

        </div>
      )}

    </div>
  );
};

export default ProfilePage;
