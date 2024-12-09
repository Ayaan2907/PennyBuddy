import { DashboardState, NavbarClosedState, ModalOpenState } from "./DashboardState";
import { AccountBalance, TransactionObject, getCategoryColorMap } from "@/app/models/transactionUtils";
import { PlaidAPIProxy } from "@/app/services/PlaidAPIProxy";

export class DashboardContext {
  private state: DashboardState;
  private selectedAccount: AccountBalance | null = null;
  private plaidProxy: PlaidAPIProxy;
  private accounts: AccountBalance[] = [];
  private transactions: TransactionObject[] = [];
  private categoryColorMap: Record<string, string> = {};
  private isLoading: boolean = false;

  constructor() {
    this.state = new NavbarClosedState();
    this.plaidProxy = new PlaidAPIProxy();
  }

  setState(state: DashboardState): void {
    console.log(`Transitioning to state: ${state.constructor.name}`);
    this.state = state;
  }

  toggleNavbar(): void {
    this.state.toggleNavbar(this);
  }

  openModal(account: AccountBalance): void {
    console.log("Opening modal...");
    this.selectedAccount = account;
    this.setState(new ModalOpenState());
  }

  closeModal(): void {
    console.log("Closing modal...");
    this.selectedAccount = null;
    this.setState(new NavbarClosedState());
  }

  async fetchData(): Promise<void> {
    console.log("Fetching data...");
    this.isLoading = true;

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in local storage.");
        return;
      }

      this.accounts = await this.plaidProxy.fetchBalances(userId);
      this.transactions = await this.plaidProxy.fetchTransactions(userId);
      this.categoryColorMap = getCategoryColorMap(this.transactions);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      this.isLoading = false;
    }
  }

  getSelectedAccount(): AccountBalance | null {
    return this.selectedAccount;
  }

  getAccounts(): AccountBalance[] {
    return this.accounts;
  }

  getTransactions(): TransactionObject[] {
    return this.transactions;
  }

  getCategoryColorMap(): Record<string, string> {
    return this.categoryColorMap;
  }

  getIsLoading(): boolean {
    return this.isLoading;
  }
}
