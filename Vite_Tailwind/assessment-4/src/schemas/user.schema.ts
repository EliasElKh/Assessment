
import { z } from "zod";

export const userFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  dob: z.string().min(1, "Date of birth is required"),
  status: z.enum(["active", "locked"])
});

export type UserFormData = z.infer<typeof userFormSchema>;