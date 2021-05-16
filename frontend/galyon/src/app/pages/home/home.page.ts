import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LogService } from '../../services/log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public user: UserService,
    private log: LogService,
    private router: Router,
  ) { }
}
