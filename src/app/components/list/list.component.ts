import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Tracker } from '../../tracker.model';
import { TrackerService } from '../../tracker.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

	trackers: Tracker[];
	displayColumns = ['project', 'date', 'description', 'status', 'actions'];

  constructor(private trackerService: TrackerService, private router: Router) { }

  ngOnInit() {
  	this.fetchTrackers();
  }

  // Method used to retrieve complete list of trackers to display
  // Done by calling TrackerService method "getTracker" 
  // And subscribing to the observable that is returned
  fetchTrackers() {
  	this.trackerService
  	.getTrackers()
  	.subscribe((data: Tracker[]) => {
  		this.trackers = data;
  		console.log('Data requested ... ');
  		console.log(this.trackers);
  	});
  }

  // Event handler method for the click event of the edit link
  // Navigate - navigates to edit route
  editTracker(id) {
  	this.router.navigate([`/edit/${id}`]);
  }

  // Event handler connected to click event of delete link
  deleteTracker(id) {
  	this.trackerService.deleteTracker(id).subscribe(() => {
  		this.fetchTrackers();
  	});
  }

}
 