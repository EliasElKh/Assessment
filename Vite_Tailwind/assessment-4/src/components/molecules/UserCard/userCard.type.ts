export interface UserCardProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    status?: string;
    dateOfBirth?: string;
    role?: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}