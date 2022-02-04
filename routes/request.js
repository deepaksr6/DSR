const express = require('express');
Request = require('../public/model/request.js');
Worker = require('../public/model/worker.js');
const router = express.Router();
var uid = "";
router.get('/:id/requests', function(req, res) {

    Request.find({ id: { $eq: req.params.id } }, function(err, plogs) {
        if (err) {
            console.log('error');
        } else {
            uid = req.params.id;
            res.render('request/index', { requests: plogs, id: uid });
        }
    });
});

router.get('/:id/requests/new', function(req, res) {
    res.render('request/new');
});

router.post('/requests', function(req, res) {
    Request.create(req.body.blog, function(err, newReq) {
        if (err) {
            console.log(err);
            res.render('/request/new');
        } else {
            res.redirect('/' + req.body.blog.id + '/requests');
        }
    });
});

router.get('/:id/requests/:id', function(req, res) {
    console.log(req.params)
    Request.findById(req.params.id, function(err, foundReq) {
        if (err) {
            res.redirect('/:id/requests');
        } else {
            res.render('request/show', { requ: foundReq, id: uid });
        }
    });
});

router.get('/:id/requests/:id/complete', function(req, res) {
    var newvalues = { $set: { status: "completed" } };
    Request.findByIdAndUpdate(req.params.id, newvalues, function(err, updatedReq) {
        if (err) {
            res.redirect('/' + uid + '/requests');
        } else {
            res.redirect('/' + uid + '/requests/' + req.params.id);
        }
    });


});




router.get('/:id/requests/:id/edit', function(req, res) {
    Request.findById(req.params.id, function(err, foundReq) {
        if (err) {
            res.redirect('/' + req.body.id + '/requests');
        } else {
            res.render('request/edit', { requ: foundReq, id: uid });
        }
    });
});

router.put('/:id/requests/:id', function(req, res) {
    Request.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedReq) {
        if (err) {
            res.redirect('/' + req.body.id + '/requests');
        } else {
            res.redirect('/' + uid + '/requests/' + req.params.id);
        }
    });
});

router.delete('/:id/requests/:id', function(req, res) {
    console.log(req.params)
    Request.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.send('SOMETHING WENT WRONG');
        } else {
            res.redirect('/' + uid + '/requests');
        }
    });
});

module.exports = router;