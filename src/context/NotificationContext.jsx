import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Simulated real-time polling (will be replaced with WebSocket/Socket.io later)
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    // Simulated incoming notifications
    const mockNotifications = [
      {
        id: 1,
        type: 'admission',
        title: 'Admission Request Received',
        message: 'Your admission request for John Doe has been received and is under review.',
        status: 'reviewing',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false,
      },
      {
        id: 2,
        type: 'news',
        title: 'New School News',
        message: 'End of term examinations will begin on Monday, June 15th.',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        read: false,
      },
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter((n) => !n.read).length);

    // Simulate receiving a new notification after 10 seconds
    const timer = setTimeout(() => {
      const newNotif = {
        id: Date.now(),
        type: 'admission',
        title: 'Admission Status Updated',
        message: 'Congratulations! Your child has been ACCEPTED. Please visit the school for registration.',
        status: 'accepted',
        timestamp: new Date().toISOString(),
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
      setUnreadCount((prev) => prev + 1);
    }, 10000);

    return () => clearTimeout(timer);
  }, [user]);

  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead, clearAll }}
    >
      {children}
    </NotificationContext.Provider>
  );
};