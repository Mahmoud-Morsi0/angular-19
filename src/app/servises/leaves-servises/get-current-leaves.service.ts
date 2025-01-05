import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class GetCurrentLeavesService {

  constructor() { }
  http = inject(ApiService);
  data = {
    userId: localStorage.getItem('userId'),
    startDate: new Date().getDate(),
    endDate: new Date().getDate()
  }
  getLeaves() {
    return this.http.post('leaves/current', this.data);
  }


}
