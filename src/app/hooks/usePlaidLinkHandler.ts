import { usePlaidLink } from 'react-plaid-link';
import { exchangePlaidToken, extractAccountsMetadata, sendPlaidMetadataToBackend } from '../services/plaidUtils';

export const usePlaidLinkHandler = (linkToken: string | null) => {
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (publicToken, metadata) => {
      try {
        const data = await exchangePlaidToken(publicToken);
        const accounts = extractAccountsMetadata(metadata);
        console.log("Accounts linked:", accounts);
        await sendPlaidMetadataToBackend(metadata);
      } catch (error) {
        console.error("Error handling Plaid token:", error);
      }
    },
    onExit: (error, metadata) => {
      console.error("Plaid Link Error:", error, metadata);
    },
  });

  return { open, ready };
};
