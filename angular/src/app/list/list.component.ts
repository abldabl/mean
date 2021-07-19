import { Component, OnInit } from '@angular/core';

import {UserService} from "../user/user.service";
import {NgForm} from "@angular/forms";
import {User} from "../user/user.model";

import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [UserService]
})
export class ListComponent implements OnInit {

  name!: string;
  age!: number;

  userData!:any;

  constructor(public userService: UserService,
              private router:Router) { }

  ngOnInit(): void {
    const storage=localStorage.getItem('google-auth');
    if (storage){
      this.userData=JSON.parse(storage);
    }else{
      this.signOut();
    }


    this.resetForm();
    this.refreshUsersList();
  }

  signOut(){
    localStorage.removeItem('google-auth')
      this.router.navigate(['/']).then();
  }

  resetForm(form?: NgForm){
    if(form)
      form.reset();
    this.userService.selectedUser={
      _id:"",
      name:'',
      age:0
    }
  }

  registerUserClick(form:NgForm){
    if(!form.value._id) {
      this.userService.postUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUsersList();
      });
    }else{
      this.userService.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshUsersList();
      });
    }
  }


  refreshUsersList(){
    this.userService.getUsers().subscribe((res)=>{
      this.userService.userList=res as User[];
    })
  }

  editClick(user: User){
      this.userService.selectedUser=user;
  }
  deleteClick(_id:string, form:NgForm){
    this.userService.deleteUser(_id).subscribe((res)=>{
      this.refreshUsersList();
      this.resetForm(form);
    });
  }
}
