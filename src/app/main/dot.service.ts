import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { DotModel } from './dot.model';

@Injectable({
  providedIn: 'root'
})
export class DotService {
  private url = "api/dots/";

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {
  }

  addDot(dotModel: DotModel): Observable<DotModel> {
    return this.httpClient.post<DotModel>(this.url + 'add', dotModel);
  }

  getAllDots(): Observable<Array<DotModel>> {
    return this.httpClient.get<Array<DotModel>>(this.url + 'all');
  }

}
