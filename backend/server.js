import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Tracker from './models/Tracker';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/trackers');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/trackers').get((req, res) => {
    Tracker.find((err, trackers) => {
        if (err)
            console.log(err);
        else
            res.json(trackers);
    });
});

router.route('/trackers/:id').get((req, res) => {
    Tracker.findById(req.params.id, (err, tracker) => {
        if (err)
            console.log(err);
        else
            res.json(tracker);
    });
});

router.route('/trackers/add').post((req, res) => {
    let tracker = new Tracker(req.body);
    tracker.save()
        .then(tracker => {
            res.status(200).json({'tracker': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/trackers/update/:id').post((req, res) => {
    Tracker.findById(req.params.id, (err, tracker) => {
        if (!tracker)
            return next(new Error('Could not load document'));
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

router.route('/trackers/delete/:id').get((req, res) => {
    Tracker.findByIdAndRemove({_id: req.params.id}, (err, tracker) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));
