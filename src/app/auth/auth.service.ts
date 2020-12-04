import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthModel } from './auth.model';
import { Observable } from 'rxjs';
import { JwtAuthResponseModel } from './jwt-auth-response.model';
import { map } from 'rxjs/operators';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "api/auth/";

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {
  }

  register(authModel: AuthModel): Observable<any> {
    return this.httpClient.post(this.url + 'signup', authModel);
  }

  login(authModel: AuthModel): Observable<boolean> {
    return this.httpClient.post<JwtAuthResponseModel>(this.url + 'login', authModel).pipe(map( data => {
      if ((data.authenticationToken == "") && (data.username == "")) {
        return false;
      } else {
        this.localStorageService.store('authenticationToken', data.authenticationToken);
        this.localStorageService.store('username', data.username);
        return true;
      }
    }));
  }

  isAuthenticated(): boolean {
    return this.localStorageService.retrieve('username') != null;
  }

  logout() {
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('username');
  }

}
