const express = require('express');
Worker = require('../public/model/worker.js');
const router = express.Router();

router.get('/admin/worker', function(req, res) {
    Worker.find({}, function(err, plogs) {
        if (err) {
            console.log('error');
        } else {
            res.render('admin/worker', { worker: plogs });
        }
    });
});



router.post('/admin/worker', function(req, res) {
    Worker.create(req.body.worker, function(err, newReq) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin/worker');
        }
    });
});

router.get('/admin/worker/:id', function(req, res) {
    Worker.findById(req.params.id, function(err, foundReq) {
        if (err) {
            res.redirect('/admin/worker');
        } else {
            res.render('admin/worker', { requ: foundReq, id: req.body.id });
        }
    });
});

router.get('/admin/worker/:id/edit', function(req, res) {
    Worker.findById(req.params.id, function(err, foundReq) {
        if (err) {
            console.log(err)
        } else {
            res.render('admin/edit', { worker: foundReq, id: req.body.id });
        }
    });
});

router.put('/admin/worker/:id', function(req, res) {
    var id = req.params.id;
    Worker.findByIdAndUpdate(id, req.body.worker, { new: true }, function(err, updatedReq) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/admin/worker');
        }
    });
});


router.delete('/admin/worker/:id', function(req, res) {
    Worker.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.send('SOMETHING WENT WRONG');
        } else {
            res.redirect('/admin/worker');
        }
    });
});

module.exports = router;