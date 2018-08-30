import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getTrackers() {
    return this.http.get(`${this.uri}/trackers`);
  }

  getTrackersById(id) {
    return this.http.get(`${this.uri}/trackers/${id}`);
  }

  addTracker(project, date, description, status) {
    const tracker = {
      project: project,
      date: date,
      description: description,
      status: status
    };
    return this.http.post(`${this.uri}/trackers/add`, tracker);
  }

  updateTracker(id, project, date, description, status) {
    const tracker = {
      project: project,
      date: date,
      description: description,
      status: status
    };
    return this.http.post(`${this.uri}/trackers/update/${id}`, tracker);
  }

  deleteTracker(id) {
    return this.http.get(`${this.uri}/trackers/delete/${id}`);
}
}
