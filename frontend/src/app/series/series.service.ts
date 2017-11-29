import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { Series } from "../models/Series";
import { Observable } from "rxjs/Observable";

@Injectable()
export class SeriesService {
  private basePath = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  public getSeriesByName(name = 'Silicon Valley', season = ''): Observable<Series> {
    return this.http.get<Series>(`${this.basePath}/series/${name}${season}`);
  }
}
