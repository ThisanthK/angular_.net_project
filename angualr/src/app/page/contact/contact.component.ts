import { Component } from '@angular/core';
import { HeaderComponent } from '../../layouts/header/header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  Email:string = "wrub123@temporarymail.com";
}
