const API_URL = "http://localhost:3003";

export const paymentService = async (payload: any) => {
    try {   
        const response = await fetch(`${API_URL}/transactions/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error in payment:", error);
        throw error;
    }
}