import { Component, OnInit } from '@angular/core';
import { uniqueData } from './custom-operators';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-custom-operator',
  templateUrl: './custom-operator.component.html',
  styleUrls: ['./custom-operator.component.css']
})
export class CustomOperatorComponent implements OnInit {
  data:any[] = [];
  constructor() { }

  ngOnInit(): void {
    let arr = ['a', 12, 14, 'bb', 'ccc', 12, 5, 12, 11, 5, 'aaa', 'bb'];
    of(arr)
    .pipe(
      uniqueData
    )
    .subscribe((res:any) => this.data = res)
  }

}
