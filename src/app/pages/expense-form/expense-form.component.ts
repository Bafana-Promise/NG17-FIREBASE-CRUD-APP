import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExpenseService } from '../../core/services/expense.service';
import { snapshotChanges } from '@angular/fire/compat/database';
import { IExpense } from '../../core/models/common.model';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss'
})
export class ExpenseFormComponent implements OnInit {
  expenses: IExpense[] = [];
  expenseForm!: FormGroup;
  expenseId = '';

  constructor(private fb: FormBuilder, private expenseService: ExpenseService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.expenseForm = this.fb.group({
      price: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.expenseId = params['id'];
        this.getExpense(this.expenseId);
      }
    })
  }

  getAllExpenses() {
    this.expenseService.getAllExpenses().snapshotChanges().subscribe({
      next: (data) => {
        console.log('Data ==> ', data)
      },
    })
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      console.log('Form ==>', this.expenseForm.value);
      this.expenseService.addExpense(this.expenseForm.value);
      this.router.navigate(['/']);
    } if (this.expenseId !== '') {
      this.expenseService.updateExpense(this.expenseId, this.expenseForm.value);
      this.router.navigate(['/']);
    } else {
      this.expenseForm.markAllAsTouched();
    }
  }

  updateExpense() {
    if (this.expenseId !== '') {
      this.expenseService.updateExpense(this.expenseId, this.expenseForm.value);
    }
  }

  // onSubmit(form: any){
  //   if(this.expenseForm.valid){
  //     console.log(this.expenseForm.value);
  //     console.log("form ===>", form)
  //   }else{
  //     this.expenseForm.markAllAsTouched();
  //   }
  // }

  getExpense(key: string) {
    this.expenseService.getExpense(key).snapshotChanges().subscribe({
      next: (data) => {
        let expense = data.payload.toJSON() as IExpense;
        this.expenseForm.setValue(expense);
      }
    })
  }

}
