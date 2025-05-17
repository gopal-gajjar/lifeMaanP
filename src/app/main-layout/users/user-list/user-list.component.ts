import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

@Component({
  selector: 'app-user-list',
  template: `
    <div class="user-list">
      <div class="header">
        <h2>Users</h2>
        <button mat-raised-button color="primary" (click)="createNew()">
          <mat-icon>person_add</mat-icon>
          Create New User
        </button>
      </div>
      <div class="users">
        <mat-card *ngFor="let user of users" class="user-card" (click)="editUser(user.id)">
          <mat-card-header>
            <mat-card-title>{{ user.name }}</mat-card-title>
            <mat-card-subtitle>{{ user.email }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p class="role">{{ user.role }}</p>
            <p class="created">Created: {{ user.createdAt | date }}</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .user-list {
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .users {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .user-card {
      cursor: pointer;
      transition: transform 0.2s;
    }
    .user-card:hover {
      transform: translateY(-2px);
    }
    .role {
      color: #666;
      font-style: italic;
      margin: 8px 0;
    }
    .created {
      color: #666;
      font-size: 0.9em;
      margin: 0;
    }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    } else {
      // Mock data
      this.users = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Admin',
          createdAt: new Date()
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'User',
          createdAt: new Date()
        }
      ];
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  createNew() {
    this.router.navigate(['/users/new']);
  }

  editUser(id: number) {
    this.router.navigate(['/users', id]);
  }
} 