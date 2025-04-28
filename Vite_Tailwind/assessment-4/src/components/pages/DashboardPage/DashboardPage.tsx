
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardHeader from "../../organisms/DashboardHeader";
import UserGrid from "../../organisms/UserGrid";
import { SearchBar } from "../../molecules/searchBar";
import useThemeStore from "../../../store/themeStore";
import { getUsers } from "../../../api/users"; 
import ConfirmationModal from '../../molecules/ConfirmationModal';
import { showSuccessToast, showErrorToast } from '../../../lib/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../../../api/users';
import { useNavigate } from "react-router-dom";
const Dashboard: React.FC = () => {
  const { theme } = useThemeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    userId: '',
  });
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      showSuccessToast('User deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] }); 
    },
    onError: (error) => {
      showErrorToast(
        (error as unknown as { response?: { data?: { message?: string } } })?.response?.data?.message || 
        'Failed to delete user'
      );
    }
  });
  const handleDeleteClick = (userId: string) => {
    setDeleteModal({ isOpen: true, userId });
  };
  const handleConfirmDelete = () => {
    deleteMutation.mutate(deleteModal.userId);
    setDeleteModal({ isOpen: false, userId: '' });
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, userId: '' });
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery === "" ? "" : searchQuery);
    }, searchQuery === "" ? 0 : 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const {
    data: users = [],
    isLoading: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ['users', debouncedSearchQuery],
    queryFn: () => getUsers(debouncedSearchQuery),
    retry: false
  });

  useEffect(() => {
    refetch();
  }, [debouncedSearchQuery, refetch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark:bg-gray-900' : 'bg-white'}`}>
      <DashboardHeader />
      <div className="p-4 space-y-6">
        <SearchBar
        type=""
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search here..."
          className={`w-[65%] sm:w-[75%] md:w-[60%] lg:w-[50%] xl:w-[40%] p-2 border rounded transition-all duration-300 ease-in-out transform focus:scale-105 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-600' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#3251D0]'
          }`}
        />
  
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <p className={`text-center ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}>
            {error.message}
          </p>
        ) : (
          <div className="transition-all duration-200">
            {users.length === 0 ? (
              <p className={`text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {debouncedSearchQuery ? "No matching users found" : "No users available"}
              </p>
            ) : (
              <UserGrid 
                users={users}
                onEdit={(userId) => navigate(`/dashboard/edit/${userId}`)}
                onDelete={handleDeleteClick}
              />
              
              
            )}
            <ConfirmationModal
              isOpen={deleteModal.isOpen}
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
              title="Confirm Deletion"
              message="Are you sure you want to delete this user? This action cannot be undone."
            />
          </div>
          
        )}
      </div>
    </div>
  );
};

export default Dashboard;