import { NgModule } from '@angular/core';
import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3/test3.component';
import { Test4Component } from './test4/test4.component';

const routes: Routes = [
    { path: '', component: Test1Component, 
        children: [
            {path: '', component: Test2Component, outlet: 'left'},
            {path: 'test3', component: Test3Component },
            {path: 'test4', component: Test4Component },
        ] 
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
      RouterModule
    ]
})
export class LazyRoutingModule { }
