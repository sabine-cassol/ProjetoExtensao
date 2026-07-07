export interface Users {
    id: string;
    login: string;
    RA: string;
}


export const USERS: Users[] = [
    {
        id: '1',
        login: 'professor@escola.com',
        RA: "1234567-8"
    },
    {
        id: '2',
        login: 'aluno@escola.com',
        RA: "1234569-8"
    },
]