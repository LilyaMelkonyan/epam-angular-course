import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { XxxRoutingModule } from './xxx-routing.module';
import { XxxComponent } from './xxx.component';


@NgModule({
  declarations: [
    XxxComponent
  ],
  imports: [
    CommonModule,
    XxxRoutingModule
  ]
})
export class XxxModule { }
