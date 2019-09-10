import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor(private httpService: HttpClient) { }

  getPieData(){
  return this.httpService.get('./assets/pieData.json');
  }
}
