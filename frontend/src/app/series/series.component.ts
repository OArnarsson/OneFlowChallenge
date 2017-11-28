import { Component, OnInit } from '@angular/core';
import { SeriesService } from "./series.service";
import { Series } from "../models/Series";
import { Observable, Subscribable } from "rxjs/Observable";

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
})
export class SeriesComponent implements OnInit {
  public series: Series;
  private $seriesObserver;

  constructor(private seriesS: SeriesService) {
    this.$seriesObserver = this.seriesS.getSeriesByName('Silicon Valley')
        .subscribe((series) => {
          this.series = series;
        }, error => console.log(error))
  }

  ngOnInit() { }
}
