import { Schema, model } from 'mongoose';

interface IRole {
  role: string;
}

const RoleSchema = new Schema<IRole>({
  role: {
    type: String,
    required: true,
  },
});

export const Role = model<IRole>('Role', RoleSchema);
