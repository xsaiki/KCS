import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, User, FileText, CheckCircle, Clock, XCircle, LogOut, Award, Plus, Menu, X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { ADMISSION_STATUS } from '../utils/constants';
import ClockWidget from '../components/dashboard/ClockWidget';
import AdmissionModal from '../components/dashboard/AdmissionModal';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Multiple admission requests (in-memory; backend will replace)
  const [admissions, setAdmissions] = useState([
    {
      id: 'ADM-2025-001',
      studentName: 'John Doe',
      grade: 'Primary 1 (P1)',
      submittedDate: '2025-06-01',
      status: ADMISSION_STATUS.REVIEWING,
      statusReason: 'Your application is being reviewed by our admissions team. We will get back to you within 5 working days.',
    },
  ]);

  const handleLogout = () => { logout(); navigate('/'); };

  const getStatusConfig = (status) => {
    switch (status) {
      case ADMISSION_STATUS.ACCEPTED:
        return { icon: <CheckCircle size={18} />, color: 'bg-green-100 text-green-700 border-green-200', label: 'Accepted' };
      case ADMISSION_STATUS.REJECTED:
        return { icon: <XCircle size={18} />, color: 'bg-red-100 text-red-700 border-red-200', label: 'Rejected' };
      case ADMISSION_STATUS.REVIEWING:
        return { icon: <Clock size={18} />, color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Under Review' };
      default:
        return { icon: <Clock size={18} />, color: 'bg-gray-100 text-gray-700 border-gray-200', label: 'Pending' };
    }
  };

  const handleNewAdmission = async (data) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    const newAdmission = {
      id: `ADM-2025-${String(admissions.length + 1).padStart(3, '0')}`,
      studentName: data.studentName,
      grade: data.gradeApplying,
      submittedDate: new Date().toISOString().split('T')[0],
      status: ADMISSION_STATUS.REVIEWING,
      statusReason: 'Your application has been received and is being reviewed by our admissions team.',
    };
    setAdmissions((prev) => [newAdmission, ...prev]);
    setSubmitting(false);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <User size={18} /> },
    { id: 'admission', label: 'My Applications', icon: <FileText size={18} />, badge: admissions.length },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, badge: unreadCount },
  ];

  return (
    <div className="min-h-[80vh] bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden mb-4 bg-kcsBlue text-white p-3 rounded-lg flex items-center gap-2"
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          <span className="text-sm font-semibold">Menu</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className={`lg:col-span-1 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sticky top-24">
              <div className="text-center mb-6 pb-6 border-b border-gray-100">
                <div className="w-20 h-20 bg-kcsBlue rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-3">
                  {user?.fullName?.[0]?.toUpperCase() || 'P'}
                </div>
                <h3 className="font-bold text-kcsBlue">{user?.fullName || 'Parent User'}</h3>
                <p className="text-xs text-gray-500 break-all">{user?.email}</p>
                <span className="inline-block mt-2 bg-blue-50 text-kcsBlue text-xs font-bold px-3 py-1 rounded-full">
                  Parent Account
                </span>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg font-medium text-sm transition ${
                      activeTab === tab.id ? 'bg-kcsBlue text-white' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-3">{tab.icon} {tab.label}</span>
                    {tab.badge > 0 && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-kcsYellow text-kcsBlue-dark' : 'bg-kcsRed text-white'}`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-lg font-medium text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={18} /> Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3 space-y-6">
            {/* Clock widget */}
            <ClockWidget />

            {/* Overview */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="bg-gradient-to-br from-kcsBlue to-kcsBlue-dark text-white p-6 md:p-8 rounded-2xl shadow-lg">
                  <h1 className="text-xl md:text-3xl font-bold text-white mb-2">
                    Welcome back, {user?.fullName?.split(' ')[0] || 'Parent'}! 👋
                  </h1>
                  <p className="text-gray-200 text-sm md:text-base">
                    Here's a summary of your account and applications.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                        <FileText className="text-kcsBlue" size={18} />
                      </div>
                      <span className="text-xs text-gray-500">Applications</span>
                    </div>
                    <p className="text-2xl font-bold text-kcsBlue">{admissions.length}</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 bg-yellow-50 rounded-lg flex items-center justify-center">
                        <Clock className="text-yellow-600" size={18} />
                      </div>
                      <span className="text-xs text-gray-500">Pending</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">
                      {admissions.filter((a) => a.status === ADMISSION_STATUS.REVIEWING).length}
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">
                        <Bell className="text-kcsRed" size={18} />
                      </div>
                      <span className="text-xs text-gray-500">Unread</span>
                    </div>
                    <p className="text-2xl font-bold text-kcsRed">{unreadCount}</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-kcsBlue">Recent Notifications</h3>
                    <button onClick={() => setActiveTab('notifications')} className="text-xs text-kcsBlue font-semibold hover:underline">
                      View all
                    </button>
                  </div>
                  {notifications.slice(0, 3).map((n) => (
                    <div key={n.id} className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${n.read ? 'bg-gray-300' : 'bg-kcsRed'}`}></div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-gray-800 truncate">{n.title}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{n.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Admission tab */}
            {activeTab === 'admission' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-kcsBlue">My Applications</h2>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="btn-primary flex items-center gap-2 text-sm py-2 px-4"
                  >
                    <Plus size={16} /> New Application
                  </button>
                </div>

                {admissions.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="mx-auto text-gray-300 mb-3" size={48} />
                    <p className="text-gray-500 mb-4">You haven't submitted any applications yet.</p>
                    <button onClick={() => setModalOpen(true)} className="btn-primary">Request Admission</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {admissions.map((adm) => {
                      const cfg = getStatusConfig(adm.status);
                      return (
                        <div key={adm.id} className="border border-gray-200 rounded-xl p-5">
                          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                            <div>
                              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Application ID</span>
                              <p className="font-bold text-kcsBlue">{adm.id}</p>
                            </div>
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs ${cfg.color}`}>
                              {cfg.icon}<span className="font-bold">{cfg.label}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500 text-xs">Student</span>
                              <p className="font-semibold text-gray-800">{adm.studentName}</p>
                            </div>
                            <div>
                              <span className="text-gray-500 text-xs">Grade</span>
                              <p className="font-semibold text-gray-800">{adm.grade}</p>
                            </div>
                            <div>
                              <span className="text-gray-500 text-xs">Submitted</span>
                              <p className="font-semibold text-gray-800">{adm.submittedDate}</p>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <span className="text-xs text-gray-500">Status Details</span>
                            <p className="text-gray-700 text-sm mt-1">{adm.statusReason}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-6 bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
                  <Award className="text-kcsBlue shrink-0" size={20} />
                  <div className="text-xs sm:text-sm">
                    <p className="font-semibold text-kcsBlue">What happens next?</p>
                    <p className="text-gray-600">
                      You'll receive real-time notifications here and via email once a decision is made.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifications tab */}
            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-kcsBlue">Notifications</h2>
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="text-sm text-kcsBlue font-semibold hover:underline">
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
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            n.read ? 'bg-gray-200 text-gray-500' : 'bg-kcsBlue text-white'
                          }`}>
                            <Bell size={16} />
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="font-bold text-kcsBlue text-sm truncate">{n.title}</h4>
                              {!n.read && <span className="w-2 h-2 bg-kcsRed rounded-full shrink-0"></span>}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                            <span className="text-[10px] text-gray-400 mt-1 block">
                              {new Date(n.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* Modal */}
      <AdmissionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleNewAdmission}
        loading={submitting}
        initialData={{ parentName: user?.fullName || '', parentEmail: user?.email || '' }}
      />
    </div>
  );
};

export default Dashboard;