"use client";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  // State for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [dobDate, setDobDate] = useState("");
  const [gender, setGender] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [avatar3dUrl, setAvatar3dUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Populate state from user object when available
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.emailAddresses[0]?.emailAddress || "");
      setUsername(user.username || "");
      setProfilePicture(user.imageUrl || "");

      // Auto Redirect Logic from README.md
      const checkUserPersistence = async () => {
        try {
          const email = user.emailAddresses[0]?.emailAddress;
          const res = await fetch(`/api/check-user?email=${email}`);
          const data = await res.json();
          
          if (data.exists) {
            // Fetch special users list
            const specialRes = await fetch('/api/special-users');
            const specialData = await specialRes.json();
            const isSpecial = specialData.users?.some(u => u.email === email);

            // Re-calculate the layout redirection logic
            const today = new Date();
            const realdate = today.toISOString().split('T')[0];
            
            if (data.user.dob === realdate) {
              if (isSpecial) {
                router.push("/birthday_layout-2");
              } else {
                router.push("/birthday_layout-1");
              }
            } else {
              router.push("/normal_layout-3");
            }
          }
        } catch (err) {
          console.error("Redirection check failed:", err);
        }
      };
      checkUserPersistence();
    }
  }, [user, router]);

  if (!isLoaded) {
    return <div className="flex justify-center items-center min-h-screen text-slate-600 font-bold">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <div className="glass-card p-12 text-center max-w-xl">
          <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent glow-text">
            Welcome to Wishing
          </h1>
          <p className="text-slate-600 mb-10 text-lg font-medium leading-relaxed">
            Join us to celebrate your special moments and share them with your loved ones in a magical, anti-gravity experience.
          </p>
          <div className="flex gap-6 justify-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-rose-200/50 transition-all hover:scale-105 active:scale-95">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-white border-2 border-rose-500 text-rose-500 hover:bg-rose-50 px-10 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </div>
    );
  }

  const handleLayoutRedirect = async () => {
    const today = new Date();
    const realdate = today.toISOString().split('T')[0];
    
    // Check for special users
    const specialRes = await fetch('/api/special-users');
    const specialData = await specialRes.json();
    const isSpecial = specialData.users?.some(u => u.email === email);

    // Logic for redirection
    if (dobDate === realdate) {
      if (isSpecial) {
        router.push("/birthday_layout-2");
      } else {
        router.push("/birthday_layout-1");
      }
    } else {
      router.push("/normal_layout-3");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      firstname: firstName,
      lastname: lastName,
      username: username,
      email: email,
      dob: dobDate,
      gender: gender,
      profil_picture: profilePicture,
      video_url: videoUrl,
      avatar_3d_url: avatar3dUrl,
      for_message: "Birthday",
      to_message: "Friend"
    };

    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (data.success) {
        handleLayoutRedirect();
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (e) {
      console.error(e);
      alert('Failed to save data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl glass-card p-10 md:p-16 shadow-2xl relative overflow-hidden">
        {/* Decorative highlight */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-200/20 rounded-full -mr-10 -mt-10 blur-3xl animate-pulse" />
        
        <div className="flex justify-between items-center mb-12 relative z-10">
          <h2 className="text-3xl font-black text-rose-600 tracking-tight glow-text">Profile Details</h2>
          <UserButton afterSignOutUrl="/" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">First Name</label>
              <input 
                type="text" 
                className="w-full bg-white/40 border border-white/60 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all text-slate-800 placeholder-slate-400 shadow-sm"
                value={firstName} onChange={(e) => setFirstName(e.target.value)} required 
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Last Name</label>
              <input 
                type="text" 
                className="w-full bg-white/40 border border-white/60 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all text-slate-800 placeholder-slate-400 shadow-sm"
                value={lastName} onChange={(e) => setLastName(e.target.value)} required 
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Email</label>
            <input 
              type="email" 
              className="w-full bg-white/20 border border-white/40 rounded-xl px-5 py-3 focus:outline-none text-slate-500 disabled:opacity-50 cursor-not-allowed"
              value={email} disabled 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Username</label>
              <input 
                type="text" 
                className="w-full bg-white/40 border border-white/60 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all text-slate-800 placeholder-slate-400 shadow-sm"
                value={username} onChange={(e) => setUsername(e.target.value)} required 
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Date of Birth</label>
              <input 
                type="date" 
                className="w-full bg-white/40 border border-white/60 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all text-slate-800 placeholder-slate-400 shadow-sm"
                value={dobDate} onChange={(e) => setDobDate(e.target.value)} required 
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Profile Picture URL</label>
            <input 
              type="text" 
              className="w-full bg-white/40 border border-white/60 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all text-slate-800 placeholder-slate-400 shadow-sm"
              value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Gender</label>
              <select 
                className="w-full bg-white/40 border border-white/60 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-all text-slate-800 shadow-sm"
                value={gender} onChange={(e) => setGender(e.target.value)} required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black py-4 rounded-xl shadow-xl shadow-rose-200/50 transition-all active:scale-95 disabled:opacity-50 text-lg uppercase tracking-widest"
          >
            {loading ? "Creating Magic..." : "Celebrate My Birthday"}
          </button>
        </form>
      </div>
    </div>
  );
}

