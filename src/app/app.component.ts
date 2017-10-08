import { Component,  OnInit} from '@angular/core';
import { UserService } from 'app/user.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'EY App - User Role Assignment';

  users: any;
  hasData: boolean;
  roles: any = {
    Admin: 'Admin',
    Manager: 'Manager',
    Employee: 'Employee'
  }

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {

  }

  getUsers(search: string): void {
    this.hasData = false;
    this.userService.getUsers(search)
      .subscribe((result: any[]) => {
        this.hasData = true;
        this.users = [];
        result.forEach(item => {
          let user: any = {
            name: item.name
          };
          user.isAdmin = item.roles.some(x => x === this.roles.Admin);
          user.isEmployee = item.roles.some(x => x === this.roles.Employee);
          user.isManager = item.roles.some(x => x === this.roles.Manager);
          this.users.push(user);

        });

      });
  }

  searchUser(e: any): void {
    let searchData = e.target.value;
    if (searchData.length > 2) {
      this.getUsers(searchData);
    }
  }

  saveUSer(): void {
    let users = [];
    this.users.forEach(item => {
      let user: any = { roles: [] };
      user.name = item.name;
      if (item.isAdmin) {
        user.roles.push(this.roles.Admin);
      }
      if (item.isEmployee) {
        user.roles.push(this.roles.Employee);
      }
      if (item.isManager) {
        user.roles.push(this.roles.Manager);
      }
      users.push(user);
    })
    console.log('User Data', users);
  }
}
