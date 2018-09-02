import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { TrackerService } from '../../tracker.service';
import { Tracker } from '../../tracker.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

	id: String;
	tracker: any = {};
	updateForm: FormGroup;

  constructor(private trackerService: TrackerService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) { 
  	this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.trackerService.getTrackersById(this.id).subscribe(res => {
        this.tracker = res;
        this.updateForm.get('project').setValue(this.tracker.project);
        this.updateForm.get('date').setValue(this.tracker.date);
        this.updateForm.get('description').setValue(this.tracker.description);
        this.updateForm.get('status').setValue(this.tracker.status);
      });
    });
  }

  createForm() {
    this.updateForm = this.fb.group({
      project: ['', Validators.required ],
      date: '',
      description: '',
      status: ''
    });
  }

  updateTracker(project, date, description, status) {
    this.trackerService.updateTracker(this.id, project, date, description, status).subscribe(() => {
      this.snackBar.open('tracker updated successfully', 'OK', {
        duration: 3000,
      });
    });
  }

}
