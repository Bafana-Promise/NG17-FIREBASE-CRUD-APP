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
export class ExpenseComponent implements OnInit{

  expense: IExpense[] = [];

  constructor(private expenseService: ExpenseService){ }

  ngOnInit(): void {
    this.getAllExpenses();
  }

  getAllExpenses(){
    this.expenseService.getAllExpenses().snapshotChanges().subscribe({
      next: (data)=> {
        console.log('Data ==> ',data)
      },
    })
  }


}
