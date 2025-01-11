import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  standalone: true,
  styleUrls: ['./user-preview.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class UserPreviewComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
