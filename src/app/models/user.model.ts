import { Role } from './role.model'; 

export class User {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  enabled!: boolean;
  roles!: Role[];  // Ensure roles are represented like this
}
