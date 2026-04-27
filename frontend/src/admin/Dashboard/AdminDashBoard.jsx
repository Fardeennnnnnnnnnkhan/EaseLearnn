import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../utils/Layout'
import axios from 'axios'
import { server } from '../../main'
import { Skeleton } from '../../components/Skeleton'

function AdminDashBoard({user}) {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  if(user && user.role !== "admin") return navigate("/")

  const fetchStats = async()=>{
      try{
          const {data} = await axios.get(`${server}/admin/stats` , {
            headers:{
              token : localStorage.getItem("token")
            }
          })
          setStats(data.stats)
          setLoading(false)
      }catch(err){
        console.log(err)
        setLoading(false)
      }
  }

  useEffect(()=>{
      fetchStats()
  },[])

  return (
    <Layout> 
      <div className="min-content flex justify-center py-20 px-4 md:px-8">
        <div className="w-full max-w-6xl">
          <h1 className="text-3xl font-light text-foreground mb-8">Dashboard Overview</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? (
              <>
                <div className="p-8 bg-card rounded-2xl shadow-sm border border-border flex flex-col justify-between h-48">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-12 h-12 rounded-full" />
                  </div>
                  <div>
                    <Skeleton className="w-16 h-10 mb-4" />
                    <Skeleton className="w-32 h-4" />
                  </div>
                </div>
                <div className="p-8 bg-card rounded-2xl shadow-sm border border-border flex flex-col justify-between h-48">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-12 h-12 rounded-full" />
                  </div>
                  <div>
                    <Skeleton className="w-16 h-10 mb-4" />
                    <Skeleton className="w-32 h-4" />
                  </div>
                </div>
                <div className="p-8 bg-card rounded-2xl shadow-sm border border-border flex flex-col justify-between h-48">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-12 h-12 rounded-full" />
                  </div>
                  <div>
                    <Skeleton className="w-16 h-10 mb-4" />
                    <Skeleton className="w-32 h-4" />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Total Courses Box */}
                <div className="p-8 bg-card rounded-2xl shadow-sm border border-border flex flex-col justify-between hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted-foreground font-light uppercase tracking-wider text-sm">Total Courses</span>
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-4xl font-light text-foreground mb-4">{stats.totalCourses || 0}</p>
                    <Link to={'/admin/course'} className="text-sm text-primary hover:underline font-light inline-flex items-center">
                      Manage Courses <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  </div>
                </div>

                {/* Total Lectures Box */}
                <div className="p-8 bg-card rounded-2xl shadow-sm border border-border flex flex-col justify-between hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted-foreground font-light uppercase tracking-wider text-sm">Total Lectures</span>
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-4xl font-light text-foreground mb-4">{stats.totalLectures || 0}</p>
                    <span className="text-sm text-muted-foreground">Across all courses</span>
                  </div>
                </div>

                {/* Total Users Box */}
                <div className="p-8 bg-card rounded-2xl shadow-sm border border-border flex flex-col justify-between hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-muted-foreground font-light uppercase tracking-wider text-sm">Total Users</span>
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15.21 12a4 4 0 015.89 3.4M4.9 15.4a4 4 0 015.89-3.4M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-4xl font-light text-foreground mb-4">{stats.totalUsers || 0}</p>
                    <Link to={'/admin/users'} className="text-sm text-primary hover:underline font-light inline-flex items-center">
                      Manage Users <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashBoard
