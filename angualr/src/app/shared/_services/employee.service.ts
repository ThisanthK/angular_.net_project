import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
// import { Employee } from './employee.model';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

 private apiUrl:string = environment.apiBaseUrl+'/Employee';

  constructor(private http:HttpClient) { }


  getEmployee():Observable<Employee[]>{
   return this.http.get<Employee[]> (this.apiUrl);
  }

  addEmployee(employee:Employee):Observable<Employee>{
      return this.http.post<Employee>(this.apiUrl,employee);
  }

  getEmployeeById(id:number):Observable<Employee>{
    return this.http.get<Employee>(this.apiUrl+'/'+id);
  }

  updateEmployee(id: number, employee:Employee):Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/updateData/${id}`, employee);
  }

  deleteEmployee(id: number) :Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/deleteData/${id}`);
  }

}



 

  // updateEmployee(id:number):Observable<any>{
  //   return this.http.put(this.Url+'/'+id)
  // }



  // getEmployee(){
  //   this.http.get(this.Url).
  //     subscribe({
  //       next:res=>{
  //         this.list = res as Employee[]
  //       },
  //       error:err=>{
  //         console.log(err)
  //       }
  //     })
  //   }
    
  // postEmployee(){
  //     return this.http.post (this.Url,this.formData)
  // }

  // updateEmployee(id: number, employee: any) {
  //   return this.http.put(`${this.Url}/${id}`, employee);
  // }

  // deleteEmployee(id: number) {
  //   return this.http.delete(`${this.Url}/${id}`);
  // }

  // resetFrom(form:NgForm){
  //     form.form.reset()
  //     this.formData = new Employee()
  //   }
  // }

//   getEmployeeById(empId: string): Observable<Employee> {
//     return this.http.get<Employee>(`${this.Url}/${empId}`);
//   }