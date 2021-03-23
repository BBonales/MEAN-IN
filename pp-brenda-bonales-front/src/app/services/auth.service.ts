import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL='http://localhost:3000/api';
  users!: User[];
  userSearch: User
  result:any[] =[];
  constructor(public http:HttpClient,public router:Router) { 
    this.userSearch=new User();
  }

  
  signUpUser(user:User) {
    return this.http.post<any>(this.URL + '/signup', user);
  }

  signInUser(user:User) {
    return this.http.post<any>(this.URL + '/signin', user);
  }

  listUsers()
  {
    return this.http.get<User[]>(this.URL + '/list-users');
  }

  specificlistUsers()
  {
    return this.http.get<any>(this.URL + '/specific-list');
  }

  listFilterUser(user:User)
  {
    return this.http.get<User[]>(this.URL+'/list-users'+`/${user.name}`+`/${user.hobby}`);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteUser(_id: string)
   {
     return this.http.delete(this.URL+`/${_id}`);
   }
}
