import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserPreviewComponent } from '../user-preview/user-preview.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  standalone: true,
  styleUrls: ['./user-form.component.scss'],
  imports: [FormsModule, CommonModule, UserPreviewComponent],
})
export class UserFormComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  constructor(private userService: UserService) {}

  onSubmit() {
    if (
      this.user.firstName &&
      this.user.lastName &&
      this.user.email &&
      this.user.password
    ) {
      this.userService.saveUser(this.user).subscribe(
        () => {
          alert('Użytkownik dodany!');
        },
        (error) => {
          alert('Błąd dodawania użytkownika');
        }
      );
    } else {
      alert('Proszę wypełnić wszystkie pola.');
    }
  }
}
