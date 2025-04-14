import React, { useEffect, useState, useRef } from "react";
import DashboardHeader from "../../organisms/DashboardHeader";
import UserGrid from "../../organisms/UserGrid";
import { User } from "./User.type";
import { SearchBar } from "../../molecules/searchBar";
import useLoginStore from "../../../store/login";
import useThemeStore from "../../../store/themeStore";

const Dashboard: React.FC = () => {
  const { theme } = useThemeStore();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const abortControllerRef = useRef<AbortController | null>(null);
  const { token } = useLoginStore();

  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

 
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery === "") {
        setDebouncedSearchQuery(""); 
      } else {
        setDebouncedSearchQuery(searchQuery);
      }
    }, searchQuery === "" ? 0 : 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

 
  const fetchUsers = React.useCallback(async (query = "") => {
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError("");
    setUsers([]); 

    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/users?search=${query}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: abortController.signal
      });

      
      if (abortController.signal.aborted) return;

      const responseData = await res.json();

      if (abortController.signal.aborted) return;

      if (responseData.status === 401) {
        setError(responseData.result.message || "Unauthorized access");
        return;
      }

      if (res.ok && responseData.result && Array.isArray(responseData.result.data.users)) {
        const transformedUsers = responseData.result.data.users.map((user: User) => ({
          id: user.id,
          name: user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          firstName: user.firstName || user.name?.split(' ')[0] || '',
          lastName: user.lastName || user.name?.split(' ').slice(1).join(' ') || '',
          email: user.email,
          status: user.status,
          dateOfBirth: user.dateOfBirth,
          role: user.role
        }));
        setUsers(transformedUsers);
      } else {
        setError(responseData.result?.message || "Failed to fetch users.");
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error(err);
        setError("Network error while fetching users.");
      }
    } finally {
      if (!abortController.signal.aborted) {
        setLoading(false);
      }
    }
  }, [token]);

  
  useEffect(() => {
    if (token) {
      fetchUsers(debouncedSearchQuery);
    }
  }, [fetchUsers, debouncedSearchQuery, token]);

  
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchQuery(keyword);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark:bg-gray-900' : 'bg-white'}`}>
      <DashboardHeader />
  
      <div className="p-4 space-y-6">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search here..."
          className={`w-[65%] sm:w-[75%] md:w-[60%] lg:w-[50%] xl:w-[40%] p-2 border rounded transition-all duration-300 ease-in-out transform focus:scale-105 ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-600' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#3251D0]'
          }`}
          type=""
        />
  
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <p className={`text-center ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`}>
            {error}
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
                onEdit={() => {}}
                onDelete={(id) => setUsers(users.filter((u) => u.id !== id))} 
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;