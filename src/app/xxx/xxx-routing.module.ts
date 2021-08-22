import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XxxComponent } from './xxx.component';

const routes: Routes = [{ path: '', component: XxxComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class XxxRoutingModule { }
