import React from "react";
import { UserCard } from "../../molecules/UserCard";
import { UserGridProps } from "./User.type";

const UserGrid: React.FC<UserGridProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default UserGrid;