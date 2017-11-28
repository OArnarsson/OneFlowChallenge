import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesService } from "./series.service";
import { SeriesComponent } from "./series.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{path: '', component: SeriesComponent}])
  ],
  declarations: [SeriesComponent],
  providers: [SeriesService],
})

export class SeriesModule { }
