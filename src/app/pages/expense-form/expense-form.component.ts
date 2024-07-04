import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
export class ExpenseFormComponent implements OnInit{
  expense: IExpense[] = [];
  expenseForm!: FormGroup;

  constructor(private fb: FormBuilder, private expenseService: ExpenseService){
    this.expenseForm = this.fb.group({
      price: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
    })
  }

  ngOnInit(): void {

  }

  getAllExpenses(){
    this.expenseService.getAllExpenses().snapshotChanges().subscribe({
      next: (data)=> {
        console.log('Data ==> ',data)
      },
    })
  }

  onSubmit(){
    if(this.expenseForm.valid){
      console.log('Form ==>', this.expenseForm.value);
    }else{
      this.expenseForm.markAllAsTouched();
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

}
