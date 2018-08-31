import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import tracker from './models/tracker';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/trackers');

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('MongoDB database connection established successfully!');
});

// GET method registers an Event handler function
// which is called each time a HTTP GET request is sent to route
// Inside function - retrieve all trackers in database
router.route('/trackers').get((req, res) => {
    tracker.find((err, trackers) => {
        if (err)
            console.log(err);
        else
            res.json(trackers);
    });
});

// Route sends a HTTP GET request to retrieve
// a single tracker from database in JSON format
// ID parameter used to specify which tracker entry should be returned
router.route('/trackers/:id').get((req, res) => {
    tracker.findById(req.params.id, (err, tracker) => {
        if (err)
            console.log(err);
        else
            res.json(tracker);
    })
});

// Route add new trackers via HTTP POST request
// req.body - creates new tracker object
// Save method - stores new tracker object in database
router.route('/trackers/add').post((req, res) => {
    let tracker = new tracker(req.body);
    tracker.save()
        .then(tracker => {
            res.status(200).json({'tracker': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

// Send HTTP POST request to update existing trackers
// findById method - retrieves tracker which should be updated from database
// Save method stores it in the database
router.route('/trackers/update/:id').post((req, res) => {
    tracker.findById(req.params.id, (err, tracker) => {
        if (!tracker)
            return next(new Error('Could not load Document'));
        else {
            tracker.project = req.body.project;
            tracker.date = req.body.date;
            tracker.description = req.body.description;
            tracker.status = req.body.status;

            tracker.save().then(tracker => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

// Delete existing tracker entry from database
// findByIdAndRemove method expects to parameters
router.route('/trackers/delete/:id').get((req, res) => {
    tracker.findByIdAndRemove({_id: req.params.id}, (err, tracker) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));