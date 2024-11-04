// User related types and interfaces
export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserProfile extends User {
    bio?: string;
    avatarUrl?: string;
}

export interface loginData {
    email: string;
    password: string;
}

export interface registerData extends loginData {
        firstName: string,
        lastName:string,
        address:string,
        city:string,
        state:string,
        postalCode:string,
        ssn:string,
}


// Transaction related types and interfaces
export interface Transaction {
    id: string;
    userId: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: Date;
    description?: string;
}

// Budget related types and interfaces
export interface Budget {
    id: string;
    userId: string;
    totalAmount: number;
    spentAmount: number;
    startDate: Date;
    endDate: Date;
    categories: BudgetCategory[];
}

export interface BudgetCategory {
    category: string;
    allocatedAmount: number;
    spentAmount: number;
}

// Common types and interfaces
export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;