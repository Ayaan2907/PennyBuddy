const API_URL = "http://localhost:3003";

export const fetchAccountsFromDB = async (userId: any) => {
    try {   
        const response = await fetch(`${API_URL}/accounts/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching accounts:", error);
        throw error;
    }
}