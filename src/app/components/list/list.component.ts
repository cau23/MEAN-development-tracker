import { Component, OnInit } from '@angular/core';
import { TrackerService } from '../../tracker.service'; // inject TrackerService

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private trackerService: TrackerService, private router: Router) { }

  ngOnInit() {
  }

}
