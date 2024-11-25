import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { EmployeeService } from '../../../shared/_services/employee.service';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import {  Subscription } from 'rxjs';
import { Employee } from '../../../shared/_services/employee';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employeeform',
  standalone: true,
  imports: [ToastrModule,ReactiveFormsModule,CommonModule],
  templateUrl: './employeeform.component.html',
  styleUrls: ['./employeeform.component.css']
})
export class EmployeeformComponent implements OnChanges{
  @Input() selectedEmployee:Employee | null=null;
  @Output() closeForm = new EventEmitter<void>();

  // employeeformSubcription !: Subscription;
  formDetails!: FormGroup;
  isEdit = false;

  constructor(
    public employeeService: EmployeeService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRouter:ActivatedRoute
  ) {
    this.formDetails = this.formBuilder.group({
    empId: ['', Validators.required],
    name: ['', Validators.required],
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', Validators.required],
    dob: ['', [Validators.required, Validators.maxLength(10)]],
    address: ['', [Validators.required, Validators.minLength(10)]],
    phoneNo: ['', [Validators.required, Validators.maxLength(10)]]
   }); 
 }
 

  ngOnChanges(): void {
    if (this.selectedEmployee) {
      this.isEdit = true;
      this.formDetails.patchValue(this.selectedEmployee);
    } else {
      this.isEdit = false;
      this.formDetails.reset();
    }
  }
 
  // ngOnDestroy(): void {
  //   if(this.employeeformSubcription){
  //     this.employeeformSubcription.unsubscribe();
  //   }
  // }


  onSubmit() {
    if (this.formDetails.valid) {
      const employeeData = this.formDetails.value; // Get form values
      if (this.isEdit) {
        // Update existing employee
        this.employeeService.updateEmployee(this.selectedEmployee!.id!, employeeData).subscribe({
          next: () => {
            this.toastr.success('Employee updated successfully!', 'Success');
            this.closeForm.emit(); // Emit to close the form
          },
          error: () => {
            this.toastr.error('Failed to update employee. Please try again.', 'Error');
          }
        });
      } else {
        // Add new employee
        this.employeeService.addEmployee(employeeData).subscribe({
          next: () => {
            this.toastr.success('Employee added successfully!', 'Success');
            this.closeForm.emit(); // Emit to close the form
          },
          error: () => {
            this.toastr.error('Failed to add employee. Please try again.', 'Error');
          }
        });
      }
    } else {
      this.toastr.error('Please fill out all required fields correctly.', 'Form Error');
    }
  }
  
  close() {
    this.closeForm.emit(); 
  }
}

