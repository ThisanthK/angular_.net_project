
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeaderComponent } from "../../layouts/header/header.component";
import { AuthServiceService } from '../../shared/_services/auth-service.service';
import { EmployeeformComponent } from "./employeeform/employeeform.component";
import { EmployeeService } from '../../shared/_services/employee.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import {  ToastrService } from 'ngx-toastr';
import { Employee } from '../../shared/_services/employee';
import { catchError, map, Observable, of } from 'rxjs';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-records',
  standalone: true,
  imports: [HeaderComponent,RouterLink, EmployeeformComponent,CommonModule,AsyncPipe],
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})

export class RecordsComponent implements OnInit{

  employee$ !:Observable<Employee[]>;
  showEmployeeForm: boolean = false;
  selectedEmployee: Employee | null = null; 

  
  constructor(
    public employeeService:EmployeeService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employee$ = this.employeeService.getEmployee();
  }

  addEmployee(){
    this.selectedEmployee = null;
    this.showEmployeeForm = true;
  }


  editEmployee(id: number,employee: Employee) {
    this.selectedEmployee = employee;
    this.showEmployeeForm = true;
  }

  closeEmployeeForm() {
    this.showEmployeeForm = false;
    // this.selectedEmployee = null;
    this.fetchEmployees();
  }


  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).pipe(
      map(() => {
        // Update the observable stream with the filtered employees
        this.employee$ = this.employee$.pipe(
          map(employees => employees.filter(employee => employee.id !== id))
        );
        
        this.toastr.success('Employee details deleted successfully.', 'Success');
        this.fetchEmployees();
      }),
      catchError(error => {
        // Show error notification
        this.toastr.error('Failed to delete employee details.', 'Error');
        console.error(error);
        return of(null); 
      })
    ).subscribe();
  }
}

