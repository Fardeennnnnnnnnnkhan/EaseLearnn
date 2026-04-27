import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../main';
import Layout from '../utils/Layout';
import toast from 'react-hot-toast';

function AdminUser({ user }) {
  const navigate = useNavigate();

  // Redirect if user is not admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const [users, setUsers] = useState([]);

  // Fetch users from the server
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${server}/admin/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setUsers(data.users);
    } catch (err) {
      console.log(err);
      toast.error('Failed to fetch users');
    }
  };

  // Call fetchUsers on component load
  useEffect(() => {
    fetchUsers();
  }, []);

  // Update user role
  const updateRole = async (id) => {
    if (window.confirm("Are you sure you want to update the user's role?")) {
      try {
        const { data } = await axios.put(
          `${server}/admin/user/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          }
        );

        toast.success(data.message);
        fetchUsers(); // Refresh users after role update
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to update role');
      }
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 py-8 md:py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-light text-foreground">User Management</h1>
          <span className="bg-primary/10 text-primary font-light px-4 py-1.5 rounded-full">
            {users.length} Total Users
          </span>
        </div>

        {/* Scrollable Table Wrapper */}
        <div className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <div className="overflow-y-auto max-h-[60vh] custom-scrollbar">
              <table className="min-w-full text-left border-collapse">
                <thead className="sticky top-0 bg-muted border-b border-border z-10">
                  <tr>
                    <th className="px-6 py-4 font-light text-muted-foreground text-sm uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 font-light text-muted-foreground text-sm uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 font-light text-muted-foreground text-sm uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 font-light text-muted-foreground text-sm uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 font-light text-muted-foreground text-sm uppercase tracking-wider text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users && users.length > 0 ? (
                    users.map((e, i) => (
                      <tr key={e._id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4 text-muted-foreground">{i + 1}</td>
                        <td className="px-6 py-4 font-light text-foreground">{e.name}</td>
                        <td className="px-6 py-4 text-muted-foreground">{e.email}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-light ${
                            e.role === 'admin' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' 
                              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          }`}>
                            {e.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => updateRole(e._id)}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground font-light py-1.5 px-4 rounded-lg shadow-sm transition-all text-sm"
                          >
                            Toggle Role
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-muted-foreground">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminUser;
