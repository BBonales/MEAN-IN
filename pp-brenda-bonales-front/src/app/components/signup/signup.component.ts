import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {User} from '../../models/user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user:User;

  constructor(public authService: AuthService,
    public router: Router) {
      this.user= new User();
     }

  ngOnInit(): void {
  }
  
  signUp() {
    this.authService.signUpUser(this.user)
      .subscribe(
        res => {
          console.log(res);
          const {errors,token} = res;
          if(errors)
          alert(errors[0].text);
          else{
           localStorage.setItem('token', token);
           this.router.navigate(['/list-users']);
          }

        },
        err => {
          console.log(err)
          const {error} = err;
          if(error.errors)
          alert(error.errors[0].text);
        }
      )
  }
}
