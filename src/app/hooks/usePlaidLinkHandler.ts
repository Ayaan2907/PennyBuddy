import { usePlaidLink, PlaidLinkOnExit } from 'react-plaid-link';
import { exchangePlaidToken, extractAccountsMetadata, sendPlaidMetadataToBackend } from '../services/plaidUtils';

export const usePlaidLinkHandler = (linkToken: string | null) => {
  const userId = localStorage.getItem('userId');
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (publicToken, metadata) => {
      try {
        const data = await exchangePlaidToken(publicToken);
        const accounts = extractAccountsMetadata(metadata);
        console.log("Accounts linked successfully:", accounts);
        await sendPlaidMetadataToBackend(metadata, userId, data);
      } catch (error) {
        console.error("Error handling Plaid token:", error);
      }
    },
    onExit: (error, metadata) => {
      if (error) {
        console.error("Plaid Link encountered an error:", error, metadata);
      } else {
        console.log("Plaid Link was closed by the user.");
      }

      if (metadata?.link_session_id) {
        console.log("Session ID:", metadata.link_session_id);
      }
    },
  });

  return { open, ready };
};

