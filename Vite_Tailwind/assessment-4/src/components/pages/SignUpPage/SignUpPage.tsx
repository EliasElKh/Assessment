import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userFormSchema, UserFormData } from "../../../schemas/user.schema";

import Button from "../../atoms/Botton";
import { SignUpPageProps } from "./SignUpPage.type";
import useThemeStore from "../../../store/themeStore";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../../api/users";
import { useMutation, useQueryClient  } from '@tanstack/react-query';
import { showSuccessToast, showErrorToast } from "../../../lib/toast";

import { useEffect } from "react";
import { RHFInputGroup } from "../../molecules/InputGroup";


const SignUpPage: React.FC<SignUpPageProps> = () => {
  const currentTheme = useThemeStore(state => state.theme);
  const navigate = useNavigate();
  const queryClient = useQueryClient(); 



  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    mode: "onChange" 
  });
  useEffect(() => {
    const values = watch(); 
  
    console.log("Current errors:", errors);
    console.log("Form validity:", isValid);
    console.log("Form values:", values); 
  }, [errors, isValid, watch]);
  

  const onSubmit = (data: UserFormData) => {
    console.log("Form data before submission:", data);
    mutate(data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      showSuccessToast('User created successfully!');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      navigate('/dashboard'); 
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      showErrorToast(
        error?.response?.data?.message || 
        'Failed to create user. Please try again.'
      );
      
    }
  });

  return (
    <div className={`min-h-screen ${currentTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
      {/* Header remains unchanged */}
      
      <header className="flex justify-between items-center p-4 bg-[#3251D0] text-white">
        <h1 className="text-xl font-semibold">User Management</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-white text-2xl font-bold hover:text-gray-300"
          aria-label="Go back"
        >
          ×
        </button>
      </header>

      <div className="flex justify-center items-center">
        <div className={`w-full max-w-md mt-10 mb-10 p-6 rounded-2xl shadow-md ${currentTheme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className={`text-2xl font-bold mb-6 text-center ${currentTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Add New User
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <RHFInputGroup
            id="firstName"
            label="First Name"
            type="text"
            {...register("firstName")} 
            error={errors.firstName?.message}
            theme={currentTheme}
          />
            <RHFInputGroup
              
              id="lastName"
              label="Last Name"
              type="text"
              {...register("lastName")}
              theme={currentTheme}
            />
            <RHFInputGroup
              id="email"
              label="Email"
              type="email"
              {...register("email")} 
              error={errors.email?.message}
              theme={currentTheme}
            />
            <RHFInputGroup
              
              id="dob"
              label="Date of Birth"
              type="date"
              {...register("dob")}
              theme={currentTheme}
            />

            <div className="mb-4">
              <label
                htmlFor="status"
                className={`block mb-2 text-sm font-medium ${currentTheme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Status
              </label>
              <select
                id="status"
                {...register("status")}
                className={`w-full p-2.5 text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500 ${currentTheme === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
              >
                <option value="active">Active</option>
                <option value="locked">locked</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className={`w-full py-2 text-white rounded-xl bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isPending ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isPending ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;