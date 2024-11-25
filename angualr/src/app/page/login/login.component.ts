import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../shared/_services/auth-service.service';
import { HomeComponent } from '../home/home.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink , CommonModule, ReactiveFormsModule,HomeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form! : FormGroup;
  constructor(private formBuilder: FormBuilder,private service: AuthServiceService,private router:Router,
    private toastr:ToastrService
  ){}

  isSubmitted: Boolean = false;

  ngOnInit():void{
    this.form = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['',Validators.required]
    });
  }
  

  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched)||Boolean(control?.dirty))
  }

  onSubmit(){
    if(this.form.valid){
      this.service.loginUser(this.form.value).subscribe({
        next:(res:any)=>{
          this.router.navigate(['/home']);
          this.toastr.success('Login Successful')
        },
        error:(err:any)=> {
          this.toastr.error('Invalid user','Login Failed')
        }
      });
    }
      else{
        this.toastr.error('Enter valid inputs ','Invalid Form')
      }
  }
  
}
