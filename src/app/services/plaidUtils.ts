export const exchangePlaidToken = async (publicToken: string) => {
    try {
        const response = await fetch("http://localhost:3003/plaid/exchange-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ public_token: publicToken }),
        });
        const data = await response.json();
        return data.access_token.accessToken;
    } catch (error) {
        console.error("Error exchanging public token:", error);
        throw error;
    }
};

export const extractAccountsMetadata = (metadata: any) => {
    if (metadata.accounts && metadata.accounts.length > 0) {
        return metadata.accounts.map((account: any) => ({
            accountName: account.name,
            institutionName: metadata.institution?.name || "Unknown",
            accountType: account.type,
        }));
    } else {
        console.error("No accounts found in metadata.");
        return [];
    }
};

export const sendPlaidMetadataToBackend = async (metadata: any, userId: any | null, accessToken: any) => {
    if (metadata.accounts && metadata.accounts.length > 0 && metadata.institution) {
        try {
            const response = await fetch("http://localhost:3003/plaid/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: userId, access_token: accessToken }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Failed to send metadata to backend:", errorText);
                return;
            }

            const data = await response.json();
            console.log("Successfully sent metadata to backend:", data);
        } catch (error) {
            console.error("Error sending metadata to backend:", error);
        }
    } else {
        console.log("No accounts or institution data found!");
    }
};

export const fetchAccountTransactionsFromDB = async (userId: any) => {
    try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(`http://localhost:3003/plaid/gets-stored-transactions/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
}

export const fetchAccountBalancesFromDB = async (userId: any) => {
    try {
        const response = await fetch(`http://localhost:3003/plaid/gets-balances/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching account balances:", error);
        throw error;
    }
}
