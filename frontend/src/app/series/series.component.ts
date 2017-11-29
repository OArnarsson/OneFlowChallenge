import {Component, OnDestroy, OnInit} from '@angular/core';
import {SeriesService} from "./series.service";
import {Series} from "../models/Series";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
})
export class SeriesComponent implements OnInit, OnDestroy {
  public filterString: string;
  public series: Series;
  public availableSeasons = [];
  public selectedSeason = 0;
  private $seriesObserver;

  constructor(private seriesS: SeriesService) {
  }

  ngOnInit() {
    this.getSeries();
  }

  private getSeries(season = '') {
    this.$seriesObserver = this.seriesS.getSeriesByName('Silicon Valley', season)
        .subscribe((series) => {
          this.series = series;
          this.getAvailableSeasons(this.series);
        }, error => console.log(error))
  }

  private getAvailableSeasons(series: Series) {
    series.episodes.map(episode => {
      if (!this.availableSeasons.includes(episode.season)) {
        this.availableSeasons.push(episode.season);
      }
    })
  }

  public filterBySeason(season?) {
    if (season) {
      this.selectedSeason = season;
    }

    if (this.selectedSeason === 0) {
      this.getSeries();
    } else {
      this.getSeries(`?season=${this.selectedSeason}`)
    }
  }

  public clearFilters() {
    this.filterString = '';
    this.selectedSeason = 0;
    this.filterBySeason();
  }

  ngOnDestroy() {
    this.$seriesObserver.unsubscribe();
  }
}
