import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartistModule } from 'ng-chartist';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChartistModule
  ],
  exports: [
    ChartistModule
  ]
})
export class SharedModule { }
