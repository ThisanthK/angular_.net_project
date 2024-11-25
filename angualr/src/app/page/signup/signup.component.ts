import { Component } from '@angular/core';
import { AbstractControl, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirstKeyPipe } from '../../shared/pipes/first-key.pipe';
import { AuthServiceService } from '../../shared/_services/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, FirstKeyPipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(
    public formBuilder:FormBuilder,
    private service: AuthServiceService,
    private toastr:ToastrService) { }

  isSubmitted: Boolean = false;

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password')
    const confirmpassword = control.get("confirmpassword")

    if (password && confirmpassword && password.value != confirmpassword.value)
      confirmpassword?.setErrors({ passwordMismatch: true })
    else
      confirmpassword?.setErrors(null)

    return null;
  }

  form = this.formBuilder.group(
    {
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6),Validators.pattern(/(?=.*[^a-zA-Z0-9])/)]],
      confirmpassword: ['']
    }, { validators: this.passwordMatchValidator }
  )


  // onSubmit() {
  //   this.isSubmitted = true;
  //   if (this.form.valid) {
  //     this.service.createUserRegister(this.form.value)
  //       .subscribe({
  //         next: (res: any) => {
  //           if (res.succeeded) {
  //             this.toastr.success('New user created!', 'Registration Successful')
  //             this.form.reset();
  //             this.isSubmitted = false;
              
  //           }
  //         },
  //         error: err => {
  //           if (err.error.errors)
  //             err.error.errors.forEach((x: any) => {
  //               switch (x.code) {
  //                 case "DuplicateFullName":
  //                   break;

  //                 case "DuplicateEmail":
  //                   this.toastr.error('Email is already taken.', 'Registration Failed')
  //                   break;

  //                 default:
  //                   this.toastr.error('Contact the developer', 'Registration Failed')
  //                   console.log(x);
  //                   break;
  //               }
  //             })
  //           else
  //             console.log('error:',err);
  //         }

  //       });
  //   }
  // }


  onSubmit(){
    this.isSubmitted=true;
    if(this.form.valid){
      this.service.createUserRegister(this.form.value).subscribe({
        next: (res:any) =>{
          this.toastr.success('Registration Successful','Registration')
          this.form.reset();
          this.isSubmitted = false;
         
        },
        error:(err)=>{
          this.toastr.error('Enter valid input','Registration Unsuccessful')
        }
      })  
    }
    else{
      this.toastr.error('Registration Failed','Registration')
    }
  }



  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
  }
}
