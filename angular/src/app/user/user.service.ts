import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser!: User;
  userList!: User[];
  nodeUrl='http://localhost:3000/users';

  constructor(private http:HttpClient) { }


  postUser(user:User){
    return this.http.post(this.nodeUrl,user)
  }

  getUsers(){
    return this.http.get(this.nodeUrl);
  }

  putUser(user:User){
    return this.http.put(this.nodeUrl+`/${user._id}`,user);
  }
  deleteUser(_id:string){
    return this.http.delete(this.nodeUrl+`/${_id}`);
  }

}
