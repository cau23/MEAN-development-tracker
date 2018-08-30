import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TrackerService } from '../../tracker.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

	createForm: FormGroup;

  constructor(private trackerService: TrackerService, private fb: FormBuilder, private router: Router ) {
  	this.createForm = this.fb.group({
  		project: ['', Validators.required],
  		date: '',
  		description: '',
  		status: ''
  	});
   }

   addTracker(project, date, description, status) {
   	this.trackerService.addTracker(project, date, description, status).subscribe(() => {
   		this.router.navigate(['/list']);
   	});
   }

  ngOnInit() {
  }

}
