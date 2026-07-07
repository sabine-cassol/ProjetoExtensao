export type UserRole = 'guest' | 'student' | 'teacher';

export interface Users {
    id: string;
    login: string;
    RA: string;
    role: string;
    password?: string;
}

export const USERS: Users[] = [
    {
        id: '1',
        login: 'professor@escola.com',
        RA: "1234567-8",
        role: 'teacher',
        password: '123',
        
    },
    {
        id: '2',
        login: 'aluno@escola.com',
        RA: "1234569-8",
        role: 'student',
        password: '123'
    },
]