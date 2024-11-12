export const exchangePlaidToken = async (publicToken: string) => {
    try {
        const response = await fetch("http://localhost:3003/plaid/exchange-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ public_token: publicToken }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error exchanging public token:", error);
        throw error;
    }
};

export const extractAccountsMetadata = (metadata: any) => {
    if (metadata.accounts && metadata.accounts.length > 0) {
        console.log(metadata);
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

export const sendPlaidMetadataToBackend = async (metadata: any) => {
    if (metadata.accounts && metadata.accounts.length > 0 && metadata.institution) {
        const formattedData = {
            accounts: metadata.accounts.map((account: any) => {
                const { id, ...rest } = account;
                return {
                    ...rest,
                    account_id: id, 
                    institution_name: metadata.institution.name,
                    institution_id: metadata.institution.institution_id,
                };
            }),
        };
        
        try {
            const response = await fetch("http://localhost:3003/plaid/metadata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
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


