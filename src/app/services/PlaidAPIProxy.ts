import { exchangePlaidToken, fetchAccountBalancesFromDB, fetchAccountTransactionsFromDB } from './plaidUtils';

export class PlaidAPIProxy {
  async exchangeToken(publicToken: string): Promise<string> {
    console.log("Proxy: Exchanging token...");
    try {
      const accessToken = await exchangePlaidToken(publicToken);
      console.log("Proxy: Token exchanged successfully.");
      return accessToken;
    } catch (error) {
      console.error("Proxy: Error exchanging token.", error);
      throw error;
    }
  }

  async fetchBalances(userId: string): Promise<any> {
    console.log("Proxy: Fetching account balances...");
    try {
      const balances = await fetchAccountBalancesFromDB(userId);
      console.log("Proxy: Fetched balances successfully.");
      return balances;
    } catch (error) {
      console.error("Proxy: Error fetching balances.", error);
      throw error;
    }
  }

  async fetchTransactions(userId: string): Promise<any> {
    console.log("Proxy: Fetching transactions...");
    try {
      const transactions = await fetchAccountTransactionsFromDB(userId);
      const transformedTransactions = transactions.map((tx: { amount: any; category: string; }) => ({
        ...tx,
        amount: Number(tx.amount),
        category: typeof tx.category === 'string' ? tx.category.split(',') : tx.category,
      }));
      console.log("Proxy: Transactions fetched and transformed successfully.");
      return transformedTransactions;
    } catch (error) {
      console.error("Proxy: Error fetching transactions.", error);
      throw error;
    }
  }
}
