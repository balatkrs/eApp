import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class UserService {

    constructor(private http: Http) {

    }

    getUsers(search: string): any {
        return this.http.get('assets/data/user.json')
            .map(res => {
                let users = res.json()
                return users.filter(x => x.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
            })
    }

}

