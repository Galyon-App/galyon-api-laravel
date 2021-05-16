import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LogService } from '../../services/log.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dummy: any[] = Array(1);
  stores: any[] = [];

  constructor(
    public user: UserService,
    private log: LogService,
    private router: Router,
    public util: UtilService
  ) { }
}
