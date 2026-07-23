export type UserRole = 'guest' | 'student' | 'teacher';

export interface Users {
    id: string;
    login: string;
    nome?: string;    
    ra: string;       
    role: UserRole;   
    password?: string;
    curso?: string;
    periodo?: string;
}
