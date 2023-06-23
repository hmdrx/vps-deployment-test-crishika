import apiClient from './apiClient';

export const getMyProfile = auth =>
  apiClient.get('/user/my-profile', {
    headers: {
      authorization: `Bearer ${auth}`,
    },
  });

export const updateProfile = (data, auth) =>
  apiClient.patch('/user/update-account', data, {
    headers: {
      authorization: `Bearer ${auth}`,
    },
  });
