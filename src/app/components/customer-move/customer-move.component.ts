import {Component, effect, OnDestroy, signal} from '@angular/core';
import {SimulationService} from "../../services/simulation.service";
import {customerAnimation} from "./animation";
import {CommonModule} from "@angular/common";
import {
  AbstractControl,
  FormControl, FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {delay, of, Subscription, tap} from "rxjs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {RouterLink} from "@angular/router";
import {ShelvingComponent} from "./shelving/shelving.component";


@Component({
  selector: 'app-customer-move',
  templateUrl: 'customer-move.component.html',
  styleUrl: 'customer-move.component.css',
  standalone: true,
  providers: [SimulationService],
  animations: [customerAnimation],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink, ShelvingComponent]
})
export class CustomerMoveComponent implements OnDestroy {
  public readonly animationTimeS = 15;

  public minProductPrice = new FormControl<number>(20, [Validators.required, Validators.min(20)]);
  public maxProductPrice = new FormControl<number>(50, [Validators.required, this.minByFormControlValidator(() => this.minProductPrice)]);

  public cacheBalance$ = signal(0);

  private subscriptions: Subscription[] = [];

  constructor(public simulationService: SimulationService) {
    effect(() => console.log('Balance changed:', this.cacheBalance$()));

    // const obsFromSignal =  toObservable(this.cacheBalance$);
    // const signalFromObs = toSignal(obsFromSignal);
  }

  ngOnDestroy(): void {
    this.clearSubscriptions();
  }

  addCustomer(): void {
    const customer = this.simulationService.createCustomer();

    const sub$ = of(null).pipe(
      delay((this.animationTimeS - 1) * 1000),
      tap(_ =>
        this.cacheBalance$.update(balance => balance + this.calculateProductPrice())),
      delay(1000),
      tap(_ => this.simulationService.removeCustomer(customer))
    ).subscribe();

    this.subscriptions.push(sub$);
  }

  getActiveCustomers(): number {
    return this.simulationService.customers.length;
  }

  resetCacheBalance(): void {
    this.cacheBalance$.set(0)
  }

  clearActiveCustomers(): void {
    this.simulationService.clearCustomers();
    this.clearSubscriptions();
  }

  private calculateProductPrice(): number {
    if (this.maxProductPrice.invalid || this.minProductPrice.invalid) {
      console.error('Some of ranges is not set');
      return 0;
    }

    return Math.floor(Math.random() *
      ((this.maxProductPrice.value ?? 0) - (this.minProductPrice.value ?? 0) + 1) + (this.minProductPrice.value ?? 0)
    );
  }

  private clearSubscriptions(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  private minByFormControlValidator(minFromControl: () => AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value && !minFromControl) {
        return null;
      }
      return Validators.min(minFromControl().value || 0)(control);
    }
  }

  protected readonly Object = Object;
}
