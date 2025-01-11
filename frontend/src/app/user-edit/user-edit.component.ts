import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  standalone: true,
  styleUrls: ['./user-edit.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class UserEditComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  updateUser(user: any) {
    this.userService.updateUser(user).subscribe(
      () => {
        alert('Użytkownik zaktualizowany!');
      },
      (error) => {
        alert('Błąd podczas aktualizacji użytkownika');
      }
    );
  }
}
