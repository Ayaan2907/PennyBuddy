export interface Account {
	account_id: string;
	name: string;
    created_at: Date;
    id: string;
	amount: number;
    institution_id: string;
    institution_name: string;
    subtype: string;
    type: string;
    updated_at: Date;
    user_id: number;
    current_balance: number;
    available_balance: number;
}