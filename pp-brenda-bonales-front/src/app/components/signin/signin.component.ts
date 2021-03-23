import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user:User;
  constructor(public authService: AuthService,
    public router: Router) {

      this.user=new User();

     }

  ngOnInit(): void {
    this.authService.logout();
  }
  signIn()
  {
    this.authService.signInUser(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/list-users']);
        },
        err => 
        {
          console.log(err);
          const {error} = err;
          if(error.errors)
          {
            alert(error.errors[0].text);
          }
        }
      )
  }
}
