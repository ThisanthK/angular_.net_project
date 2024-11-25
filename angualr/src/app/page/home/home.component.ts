import { Component } from '@angular/core';
import { HeaderComponent } from "../../layouts/header/header.component";
import { RouterOutlet } from '@angular/router';
import { EmployeeformComponent } from '../records/employeeform/employeeform.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
