import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExpenseService } from '../../core/services/expense.service';
import { IExpense } from '../../core/models/common.model';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent implements OnInit {

  expenses: IExpense[] = [];
  totalExpenses = 0;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.getAllExpenses();
  }

  getAllExpenses() {
    this.expenseService.getAllExpenses().snapshotChanges().subscribe({
      next: (data) => {
        console.log('Data ==> ', data)
        // need to reset this as blank otherwise it will be pushed already
        this.expenses = [];
        data.forEach((item) => {
          let expense = item.payload.toJSON() as IExpense
          console.log('Expense ==>', expense)
          // Converts a string to an integer or A string to convert into a number
          this.totalExpenses += parseInt(expense.price);
          // Since Key is optional I will add a empty string
          this.expenses.push({
            key: item.key || '',
            title: expense.title,
            description: expense.description,
            price: expense.price
          });

        });

      },
    });
  }


}
