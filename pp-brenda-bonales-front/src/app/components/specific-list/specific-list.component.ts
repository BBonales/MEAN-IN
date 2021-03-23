import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-specific-list',
  templateUrl: './specific-list.component.html',
  styleUrls: ['./specific-list.component.css']
})
export class SpecificListComponent implements OnInit {

  constructor(public authService: AuthService,
    public router: Router) { }

  ngOnInit(): void {
    this.specificlistUsers();
  }

  specificlistUsers()
  {
    this.authService.specificlistUsers().subscribe(
      res => {
        console.log(res);
        this.authService.result=res;
      },
      err => console.log(err)
    )
  }

}
