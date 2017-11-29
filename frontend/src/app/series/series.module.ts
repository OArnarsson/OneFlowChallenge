import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SeriesService} from './series.service';
import {SeriesComponent} from './series.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {SanitizePipe} from '../pipes/sanitize.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EpisodeFilterPipe} from '../pipes/episode-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: SeriesComponent}])
  ],
  declarations: [
    SeriesComponent,
    SanitizePipe,
    EpisodeFilterPipe
  ],
  providers: [SeriesService],
})

export class SeriesModule { }
