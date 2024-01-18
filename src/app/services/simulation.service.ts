import {Injectable} from "@angular/core";

export interface Customer {
  id: number;
}
@Injectable()
export class SimulationService {
  public customers: Customer[] = [];

  createCustomer(): Customer {
    const customer: Customer = { id: this.customers.length + 1 };
    this.customers.push(customer);
    return customer;
  }

  removeCustomer(customer: Customer): void {
    const index = this.customers.indexOf(customer);
    if (index !== -1) {
      this.customers.splice(index, 1);
    }
  }

  clearCustomers(): void {
    this.customers = [];
  }
}
