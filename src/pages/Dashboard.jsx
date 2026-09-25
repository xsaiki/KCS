import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, User, FileText, CheckCircle, Clock, XCircle, LogOut, Award, BookOpen, Menu, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { ADMISSION_STATUS } from '../utils/constants';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Simulated admission request data
  const admissionRequest = {
    id: 'ADM-2025-001',
    studentName: 'John Doe',
    grade: 'Primary 1 (P1)',
    submittedDate: '2025-06-01',
    status: ADMISSION_STATUS.REVIEWING,
    statusReason: 'Your application is being reviewed by our admissions team. We will get back to you within 5 working days.',
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case ADMISSION_STATUS.ACCEPTED:
        return { icon: <CheckCircle size={20} />, color: 'bg-green-100 text-green-700 border-green-200', label: 'Accepted' };
      case ADMISSION_STATUS.REJECTED:
        return { icon: <XCircle size={20} />, color: 'bg-red-100 text-red-700 border-red-200', label: 'Rejected' };
      case ADMISSION_STATUS.REVIEWING:
        return { icon: <Clock size={20} />, color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Under Review' };
      default:
        return { icon: <Clock size={20} />, color: 'bg-gray-100 text-gray-700 border-gray-200', label: 'Pending' };
    }
  };

  const statusConfig = getStatusConfig(admissionRequest.status);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <User size={18} /> },
    { id: 'admission', label: 'My Application', icon: <FileText size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, badge: unreadCount },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden mb-4 bg-kcsBlue text-white p-3 rounded-lg flex items-center gap-2"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          <span>Menu</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className={`lg:col-span-1 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sticky top-24">
              <div className="text-center mb-6 pb-6 border-b border-gray-100">
                <div className="w-20 h-20 bg-kcsBlue rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-3">
                  {user?.fullName?.[0] || 'P'}
                </div>
                <h3 className="font-bold text-kcsBlue">{user?.fullName || 'Parent User'}</h3>
                <p className="text-xs text-gray-500">{user?.email}</p>
                <span className="inline-block mt-2 bg-blue-50 text-kcsBlue text-xs font-bold px-3 py-1 rounded-full">
                  Parent Account
                </span>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg font-medium transition ${
                      activeTab === tab.id
                        ? 'bg-kcsBlue text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-3">{tab.icon} {tab.label}</span>
                    {tab.badge > 0 && (
                      <span className="bg-kcsRed text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={18} /> Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fade-in">
                <div className="bg-gradient-to-br from-kcsBlue to-kcsBlue-dark text-white p-8 rounded-2xl shadow-lg">
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Welcome back, {user?.fullName?.split(' ')[0] || 'Parent'}! 👋
                  </h1>
                  <p className="text-gray-200">
                    Here's a summary of your account and application status.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <FileText className="text-kcsBlue" size={20} />
                      </div>
                      <span className="text-sm text-gray-500">Applications</span>
                    </div>
                    <p className="text-3xl font-bold text-kcsBlue">1</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                        <Clock className="text-yellow-600" size={20} />
                      </div>
                      <span className="text-sm text-gray-500">Pending</span>
                    </div>
                    <p className="text-3xl font-bold text-yellow-600">1</p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                        <Bell className="text-kcsRed" size={20} />
                      </div>
                      <span className="text-sm text-gray-500">Unread</span>
                    </div>
                    <p className="text-3xl font-bold text-kcsRed">{unreadCount}</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-kcsBlue mb-4">Recent Notifications</h3>
                  {notifications.slice(0, 3).map((n) => (
                    <div key={n.id} className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${n.read ? 'bg-gray-300' : 'bg-kcsRed'}`}></div>
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{n.title}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{n.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admission Tab */}
            {activeTab === 'admission' && (
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
                <h2 className="text-2xl font-bold text-kcsBlue mb-6">My Application</h2>

                <div className="border border-gray-200 rounded-xl p-6 mb-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="text-xs text-gray-500">Application ID</span>
                      <p className="font-bold text-kcsBlue">{admissionRequest.id}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${statusConfig.color}`}>
                      {statusConfig.icon}
                      <span className="font-bold text-sm">{statusConfig.label}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Student Name</span>
                      <p className="font-semibold text-gray-800">{admissionRequest.studentName}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Grade Applying For</span>
                      <p className="font-semibold text-gray-800">{admissionRequest.grade}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Submitted On</span>
                      <p className="font-semibold text-gray-800">{admissionRequest.submittedDate}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Status Details</span>
                    <p className="text-gray-700 mt-1">{admissionRequest.statusReason}</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
                  <Award className="text-kcsBlue shrink-0" size={22} />
                  <div className="text-sm">
                    <p className="font-semibold text-kcsBlue">What happens next?</p>
                    <p className="text-gray-600">
                      Once a decision is made, you will receive a real-time notification here and via email. You can then proceed with the registration steps.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-kcsBlue">Notifications</h2>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-kcsBlue font-semibold hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {notifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="mx-auto text-gray-300 mb-3" size={48} />
                    <p className="text-gray-500">No notifications yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition ${
                          n.read ? 'bg-gray-50 border-gray-100' : 'bg-blue-50 border-blue-100'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            n.read ? 'bg-gray-200 text-gray-500' : 'bg-kcsBlue text-white'
                          }`}>
                            <Bell size={18} />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="font-bold text-kcsBlue text-sm">{n.title}</h4>
                              {!n.read && <span className="w-2 h-2 bg-kcsRed rounded-full shrink-0"></span>}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                            <span className="text-xs text-gray-400 mt-2 block">
                              {new Date(n.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;