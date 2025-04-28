
import { User } from '../components/pages/DashboardPage';
import { apiClient } from './config';
import axios from 'axios';
import { UserFormData } from '../schemas/user.schema';

export const getUsers = async (searchQuery: string = ""): Promise<User[]> => {
  try {
    const response = await apiClient.get('/api/users', {
      params: { search: searchQuery }
    });

    if (response.data?.result?.data.users) { 
      return response.data.result.data.users.map((user: User) => ({
        id: user.id,
        name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        firstName: user.firstName || user.name?.split(' ')[0] || '',
        lastName: user.lastName || user.name?.split(' ').slice(1).join(' ') || '',
        email: user.email,
        status: user.status,
        dateOfBirth: user.dateOfBirth,
        role: user.role
      }));
    }

    throw new Error(response.data?.message || "Failed to fetch users.");
  } catch (error) {
    
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 401:
          throw new Error("Unauthorized - Please login again");
        case 404:
          throw new Error("No users found");
        case 400:
          throw new Error("Invalid search parameter");
        default:
          throw new Error(error.response?.data?.message || "Server error");
      }
    }
    throw error;
  }
};
   


export const createUser = async (userData: UserFormData) => {
  const response = await apiClient.post('/api/users', {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    status: userData.status,
    dateOfBirth: userData.dob 
  });
  return response.data;
};


export const deleteUser = async (userId: string) => {
  const response = await apiClient.delete(`/api/users/${userId}`);
  return response.data;
};




const API_BASE_URL = '/api/users';



export const getUserById = async (userId: string) => {
  try {
    const response = await apiClient.get(`${API_BASE_URL}/${userId}`);
    
    console.log('Response:', response);

    const { dateOfBirth, ...rest } = response.data.result.data.user;
    console.log('User data:', response.data.result.data.user);

    return { ...rest, dob: dateOfBirth };  
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;  
  }
};





export const updateUser = async (userId: string, userData: UserFormData) => {
  const { dob, ...rest } = userData;
  const apiData = { ...rest, dateOfBirth: dob };

  try {
    const response = await apiClient.put(`${API_BASE_URL}/${userId}`, apiData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; 
  }
};
