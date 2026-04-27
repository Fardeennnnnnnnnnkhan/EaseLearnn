import React, { useEffect, useState } from 'react';
import { UserData } from '../../context/UserContext';
import { server } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import pfp from '../account/pfp.png';
import { motion } from 'framer-motion';
import { RiLogoutBoxLine, RiDashboardLine, RiPlayCircleLine, RiBookOpenLine, RiTrophyLine, RiCheckLine } from 'react-icons/ri';

function Account({ user }) {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = UserData();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${server}/api/user/profile`, {
          headers: { token: localStorage.getItem("token") }
        });
        setProfileData(data);
      } catch (err) {
        toast.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchProfile();
  }, [user]);

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out Successfully");
    navigate('/login');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-20 px-4 md:px-8">
      {user && (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto space-y-8"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
             <div>
                <h1 className="text-3xl md:text-5xl font-light tracking-tight text-foreground mb-2">
                  Welcome back, <span className="text-primary">{user.name.split(' ')[0]}</span>
                </h1>
                <p className="text-lg text-muted-foreground font-light">Ready to continue your learning journey?</p>
             </div>
             <div className="flex gap-3 w-full md:w-auto">
               {user.role === "admin" && (
                 <button
                   onClick={() => navigate(`/admin/dashboard`)}
                   className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary py-2.5 px-6 rounded-xl font-light transition-all border border-primary/20 shadow-sm"
                 >
                   <RiDashboardLine /> Admin Panel
                 </button>
               )}
               <button
                 onClick={logoutHandler}
                 className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-card border border-border hover:bg-destructive hover:border-destructive hover:text-destructive-foreground text-foreground py-2.5 px-6 rounded-xl font-light transition-all shadow-sm"
               >
                 <RiLogoutBoxLine /> Logout
               </button>
             </div>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar / Profile Info */}
            <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
              <section className="bg-card border border-border p-8 rounded-3xl shadow-sm flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-110"></div>
                  <img
                    className="relative w-32 h-32 rounded-full shadow-lg border-4 border-background object-cover bg-muted z-10"
                    src={pfp}
                    alt={user.name}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg z-20">
                     <RiTrophyLine className="w-5 h-5" />
                  </div>
                </div>
                <h2 className="text-2xl font-light text-foreground mb-1">{user.name}</h2>
                <p className="text-sm text-muted-foreground font-light mb-6">{user.email}</p>
                
                <div className="w-full grid grid-cols-3 gap-4 border-t border-border pt-6">
                   <div className="flex flex-col items-center">
                     <span className="text-2xl font-light text-foreground">{profileData?.stats?.totalCourses || 0}</span>
                     <span className="text-xs font-light text-muted-foreground uppercase tracking-wider mt-1 text-center">Total</span>
                   </div>
                   <div className="flex flex-col items-center">
                     <span className="text-2xl font-light text-primary">{profileData?.stats?.completedCourses || 0}</span>
                     <span className="text-xs font-light text-muted-foreground uppercase tracking-wider mt-1 text-center">Done</span>
                   </div>
                   <div className="flex flex-col items-center">
                     <span className="text-2xl font-light text-orange-400">{profileData?.stats?.inProgressCourses || 0}</span>
                     <span className="text-xs font-light text-muted-foreground uppercase tracking-wider mt-1 text-center">Active</span>
                   </div>
                </div>
              </section>

              {/* Learning Stats */}
              <section className="bg-card border border-border p-6 rounded-3xl shadow-sm">
                <h3 className="text-lg font-light text-foreground mb-4 flex items-center gap-2">
                  <RiPlayCircleLine className="text-primary" /> Daily Goal
                </h3>
                <div className="w-full bg-muted h-3 rounded-full overflow-hidden mb-2">
                   <div className="bg-primary h-full rounded-full w-[60%]"></div>
                </div>
                <p className="text-sm text-muted-foreground font-light text-right">3/5 Hours</p>
              </section>
            </motion.div>

            {/* Main Content Area */}
            <motion.div variants={itemVariants} className="lg:col-span-8 space-y-8">
              
              {/* Continue Learning */}
              <section>
                <h2 className="text-2xl font-light text-foreground mb-6 flex items-center gap-2">
                  <RiBookOpenLine className="text-primary" /> My Courses
                </h2>
                
                {loading ? (
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-muted h-10 w-10"></div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-muted rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-muted rounded col-span-2"></div>
                                    <div className="h-2 bg-muted rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-muted rounded"></div>
                            </div>
                        </div>
                    </div>
                ) : profileData?.user?.purchasedCourses && profileData.user.purchasedCourses.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {profileData.user.purchasedCourses.filter(pc => pc.course).map((pc) => (
                      <div key={pc.course._id} className="group bg-card border border-border p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/50 transition-all flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden bg-muted flex-shrink-0 relative">
                           <img src={`${server}/${pc.course.image}`} alt={pc.course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                           {pc.completed && (
                               <div className="absolute top-2 right-2 bg-primary text-white p-1 rounded-full shadow">
                                   <RiCheckLine size={16} />
                               </div>
                           )}
                        </div>
                        
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-light text-foreground line-clamp-1 group-hover:text-primary transition-colors">{pc.course.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">Purchased: {new Date(pc.purchasedAt).toLocaleDateString()}</p>
                            </div>
                            
                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-light text-muted-foreground uppercase tracking-widest">{pc.completed ? 'Completed' : 'In Progress'}</span>
                                    <span className="text-xs font-light text-primary">{pc.progress}%</span>
                                </div>
                                <div className="w-full bg-muted h-2 rounded-full overflow-hidden mb-4">
                                    <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${pc.progress}%` }}
                                      transition={{ duration: 1, ease: "easeOut" }}
                                      className={`h-full rounded-full ${pc.completed ? 'bg-primary' : 'bg-orange-400'}`}
                                    ></motion.div>
                                </div>
                                
                                <button 
                                    onClick={() => navigate(`/course/study/${pc.course._id}`)} 
                                    className="w-full md:w-auto bg-primary/10 hover:bg-primary text-primary hover:text-white px-6 py-2 rounded-xl transition-colors font-light text-sm"
                                >
                                    {pc.completed ? 'Review Course' : 'Continue Learning'}
                                </button>
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full bg-card border border-border rounded-3xl p-10 text-center flex flex-col items-center shadow-sm">
                     <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-4">
                       <RiBookOpenLine size={24} />
                     </div>
                     <h3 className="text-xl font-light text-foreground mb-2">No Courses Yet</h3>
                     <p className="text-muted-foreground mb-6 max-w-sm font-light">You haven't enrolled in any courses. Explore our catalog and start learning today!</p>
                     <button onClick={() => navigate('/courses')} className="bg-primary hover:bg-primary/90 text-primary-foreground font-light py-3 px-8 rounded-xl transition-all shadow-md">
                       Browse Courses
                     </button>
                  </div>
                )}
              </section>

            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Account;
