import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public authService: AuthService,
    public router: Router) { }

  ngOnInit(): void {
    this.listUsers();
  }
  
  listUsers()
  {
    this.authService.listUsers().subscribe(
      res => {
        this.authService.users=res;
      },
      err => console.log(err)
    )
  }

  listFilterUser(form:NgForm)
  {
    const {name,hobby} = form.value
    if(!name)
      form.value.name="NA"
    if(!hobby)
    form.value.hobby="NA"
    this.authService.listFilterUser(form.value).subscribe(
      res => {
        if(res.length>0)
        this.authService.users=res;
        else
        {
          alert('No information was found.');
          this.listUsers();
        }
      },
      err => console.log(err)
    )
  }

  deleteUsers(_id:string)
  {
    if(confirm("Are you sure want to delete it?"))
    {
      this.authService.deleteUser(_id).subscribe(res =>{
        this.listUsers();
      },
      err => console.log(err)
      );
    }
  }
}
