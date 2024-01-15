export interface Profile {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: string;
    passwordHash?: string;
}
