import api from './api';

export const authService = {
  // Simulated registration - will hook to backend later
  register: async (userData) => {
    // return api.post('/auth/register', userData);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            user: {
              id: Date.now(),
              fullName: userData.fullName,
              email: userData.email,
              role: 'parent',
              verified: false,
            },
            verificationCode: '123456', // Simulated code
            message: 'Verification code sent to your email',
          },
        });
      }, 1000);
    });
  },

  verifyAccount: async (email, code) => {
    // return api.post('/auth/verify', { email, code });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (code === '123456') {
          resolve({
            data: {
              token: 'mock-jwt-token-' + Date.now(),
              user: { email, role: 'parent', verified: true },
            },
          });
        } else {
          reject({ response: { data: { message: 'Invalid verification code' } } });
        }
      }, 1000);
    });
  },

  login: async (email, password) => {
    // return api.post('/auth/login', { email, password });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            token: 'mock-jwt-token-' + Date.now(),
            user: { id: 1, email, role: 'parent', fullName: 'Parent User' },
          },
        });
      }, 1000);
    });
  },

  logout: () => {
    localStorage.removeItem('kcs_token');
    localStorage.removeItem('kcs_user');
  },
};