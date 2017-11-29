import {Component, OnDestroy, OnInit} from '@angular/core';
import { SeriesService } from "./series.service";
import { Series } from "../models/Series";
import { Observable, Subscribable } from "rxjs/Observable";
import { FormControl } from "@angular/forms";
import { Episode } from "../models/Episode";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
})
export class SeriesComponent implements OnInit, OnDestroy {
  query: FormControl = new FormControl();
  $query;
  public filterString: String;
  private episodes: Episode[];
  public filteredEpisodes: Episode[];
  public series: Series;
  public availableSeasons = [];
  public selectedSeason = 0;
  private $seriesObserver;

  constructor(private seriesS: SeriesService) { }

  ngOnInit() {
    this.initSeries();
    this.initSearch('name');
  }

  private initSeries() {
    this.$seriesObserver = this.seriesS.getSeriesByName('Silicon Valley')
        .subscribe((series) => {
          this.setValues(series);
          this.setAvailableSeasons();
        }, error => console.log(error))
  }

  private setValues(series: Series) {
    this.series = series;
    this.episodes = this.series.episodes;
    this.filteredEpisodes = this.episodes;
  }

  private setAvailableSeasons() {
    this.filteredEpisodes.map(ep => {
      if (!this.availableSeasons.includes(ep.season)) {
        this.availableSeasons.push(ep.season);
      }
    })
  }

  private initSearch(field) {
    this.$query = this.query.valueChanges
        .debounceTime(250)
        .distinctUntilChanged()
        .subscribe(
            query => {
              this.filter(query, field);
            }
        );
  }

  private filter(query, field) {
    const filter = query ? query.toLowerCase() : null;
    this.filteredEpisodes = filter
        ? this.episodes.filter(item => item[field].toLowerCase().indexOf(filter) !== -1)
        : this.episodes;
  }

  public filterBySeason(season?) {
    if (season) {
      this.selectedSeason = season;
    }

    if (this.selectedSeason === 0) {
      this.initSeries();
    } else {
      this.$seriesObserver = this.seriesS.getSeriesByName('Silicon Valley', '?season=' + this.selectedSeason)
          .subscribe((series) => {
            this.setValues(series);
            this.filter(this.filterString, 'name');
          }, error => console.log(error))
    }
  }

  public clearFilters() {
    this.query.setValue('');
    this.selectedSeason = 0;
    this.filterBySeason();
  }

  ngOnDestroy() {
    this.$query.unsubscribe();
    this.$seriesObserver.unsubscribe();
  }
}
