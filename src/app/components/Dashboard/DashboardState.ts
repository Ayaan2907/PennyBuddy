import { AccountBalance } from "@/app/models/transactionUtils";

interface DashboardContext {
    setState(state: DashboardState): void;
    openModal(account: AccountBalance): void;
    closeModal(): void;
    fetchData(): void;
  }
  
  export abstract class DashboardState {
    abstract toggleNavbar(context: DashboardContext): void;
    abstract openModal(context: DashboardContext, account: AccountBalance): void;
    abstract closeModal(context: DashboardContext): void;
    abstract fetchData(context: DashboardContext): void;
  }
  
  export class NavbarOpenState extends DashboardState {
    toggleNavbar(context: DashboardContext): void {
      context.setState(new NavbarClosedState());
    }
  
    openModal(context: DashboardContext, account: AccountBalance): void {
      console.log("Cannot open modal while navbar is open.");
    }
  
    closeModal(context: DashboardContext): void {
      console.log("Modal is already closed.");
    }
  
    fetchData(context: DashboardContext): void {
      console.log("Cannot fetch data while navbar is open.");
    }
  }
  
  export class NavbarClosedState extends DashboardState {
    toggleNavbar(context: DashboardContext): void {
      console.log("Opening navbar...");
      context.setState(new NavbarOpenState());
    }
  
    openModal(context: DashboardContext, account: AccountBalance): void {
      console.log("Opening modal...");
      context.openModal(account);
    }
  
    closeModal(context: DashboardContext): void {
      console.log("Modal is already closed.");
    }
  
    fetchData(context: DashboardContext): void {
      console.log("Fetching data...");
      context.fetchData();
    }
  }
  
  export class ModalOpenState extends DashboardState {
    toggleNavbar(context: DashboardContext): void {
      console.log("Cannot toggle navbar while modal is open.");
    }
  
    openModal(context: DashboardContext, account: AccountBalance): void {
      console.log("Modal is already open.");
    }
  
    closeModal(context: DashboardContext): void {
      console.log("Closing modal...");
      context.closeModal();
    }
  
    fetchData(context: DashboardContext): void {
      console.log("Cannot fetch data while modal is open.");
    }
  }
  