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
    Preparer: 'Preparer',
    Reviewer: 'Reviewer'

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
          user.isPreparer = item.roles.some(x => x === this.roles.Preparer);
          user.isReviewer = item.roles.some(x => x === this.roles.Reviewer);

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
      if (item.isPreparer) {
        user.roles.push(this.roles.Preparer);
      }
      if (item.isReviewer) {
        user.roles.push(this.roles.Reviewer);
      }

      users.push(user);
    })
    console.log('User Data', users);
  }
}
