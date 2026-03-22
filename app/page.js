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
    }
  }, [user]);

  if (!isLoaded) {
    return <div className="flex justify-center items-center min-h-screen bg-slate-950 text-white">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-950 text-white p-4">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Welcome to Wishing
        </h1>
        <p className="text-slate-400 mb-8 text-center max-w-md">
          Join us to celebrate your special moments and share them with your loved ones.
        </p>
        <div className="flex gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all hover:scale-105">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-transparent border border-purple-600 text-purple-400 hover:bg-purple-600/10 px-8 py-3 rounded-full font-semibold transition-all hover:scale-105">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    );
  }

  const handleLayoutRedirect = () => {
    const today = new Date();
    const realdate = today.toISOString().split('T')[0];
    
    // Logic for redirection
    if (dobDate === realdate) {
      router.push("/birthday_layout-1");
    } else {
      // For now, redirect to normal_layout-3 if not birthday
      // Layout-2 is for friend's birthday which would need search logic
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
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-purple-400">Profile Details</h2>
          <UserButton afterSignOutUrl="/" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">First Name</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                value={firstName} onChange={(e) => setFirstName(e.target.value)} required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Last Name</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                value={lastName} onChange={(e) => setLastName(e.target.value)} required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Email</label>
            <input 
              type="email" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50"
              value={email} disabled 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Username</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                value={username} onChange={(e) => setUsername(e.target.value)} required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Date of Birth</label>
              <input 
                type="date" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                value={dobDate} onChange={(e) => setDobDate(e.target.value)} required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Profile Picture URL</label>
            <input 
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              value={profilePicture} onChange={(e) => setProfilePicture(e.target.value)} 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Gender</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                value={gender} onChange={(e) => setGender(e.target.value)} required
              >
                <option value="" disabled className="bg-slate-900">Select Gender</option>
                <option value="Male" className="bg-slate-900">Male</option>
                <option value="Female" className="bg-slate-900">Female</option>
                <option value="Other" className="bg-slate-900">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">3D Avatar Link</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                value={avatar3dUrl} onChange={(e) => setAvatar3dUrl(e.target.value)} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Specific Video URL</label>
            <input 
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-purple-500/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Celebrate My Birthday"}
          </button>
        </form>
      </div>
    </div>
  );
}
