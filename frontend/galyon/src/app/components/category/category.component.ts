import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  dummy: any[] = Array(10);
  categories: any[] = [];

  constructor(
    public util: UtilService
  ) { }

  ngOnInit() {}

  goToCategory() {

  }

  goToSubCategory(category) {

  }

}
