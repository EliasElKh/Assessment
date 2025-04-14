import React from "react";
import clsx from "clsx";

export const Card: React.FC<React.HTMLProps<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div className={clsx("card", className)} {...props}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<React.HTMLProps<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div className={clsx("card-content", className)} {...props}>
      {children}
    </div>
  );
};
