import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //implement service class

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

	uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { 
  }
	
	// sending HTTP GET request to /trackers end point of backend server
	// list of trackers retrieved from MongoDB and 
	// returned in JSON format
	getTrackers() {
	return this.http.get(`${this.uri}/trackers`);
	}

	// works as above plus it accepts a parameter - "id"
	getTrackersById(id) {
		return this.http.get(`${this.uri}/trackers/${id}`);
	}

	// Adding Trackers
	// Method accepts for parameters
	addTracker(project, date, description, status) {
		const tracker = {
			project: project,
			date: date,
			description: description,
			status: status
		};
		return this.http.post(`${this.uri}/trackers/add`, tracker);
	}

	// Update Trackers
	updateTracker(id, project, date, description, status) {
		const tracker = {
			project: project,
			date: date,
			description: description,
			status: status
		}
		return this.http.post(`${this.uri}/trackers/update/${id}`, tracker);
	}

	// Delete Trackers
	deleteTracker(id) {
		return this.http.get(`${this.uri}/trackers/delete/${id}`);
	}
}
