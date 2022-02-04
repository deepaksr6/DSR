const express = require('express');
Request = require('../public/model/request.js');
const router = express.Router();
const id = 'AC07f354b2230d1d7c82d25e5c839eb8c2';
const token = '71be51596e398b7b6f2915c7179b0e56';
Worker = require('../public/model/worker.js');
const client = require('twilio')(id, token);


router.get('', function(req, res) {
    Request.find({}, function(err, re) {
        if (err) {
            console.log('error');
        } else {
            Worker.find({}, function(err1, worker11) {
                if (err1) {
                    console.log(err1);
                } else {
                    re.forEach(element => {
                        if (element.assignWorker != null) {
                            element.assignWorker = worker11.filter(t => t._id == element.assignWorker)[0].name;
                        }
                    });
                    res.render('admin/indexadmin', { requests: re });
                }
            })
        }
    });
});

router.put('/:id', function(req, res) {
    Request.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedReq) {

        if (!err) {
            res.redirect('/admin');
        } else {

            res.redirect('/admin/' + req.params.id);
        }
    });
});
router.get('/:id/edit', function(req, res) {
    Request.findById(req.params.id, function(err, foundReq) {
        if (err) {
            res.redirect('/admin/' + req.params.id + '/edit');
        } else {
            Worker.find({}, function(err1, worker11) {
                if (err1) {
                    console.log(err1);
                } else {
                    res.render('admin/editadmin', { requ: foundReq, worker: worker11 });
                }
            })

        }
    });
});

router.get('/send/:id', (req, res) => {

    console.log(req.params.id)
    Request.findById(req.params.id, function(err, plogs) {
        if (err) {
            console.log('error');
        } else {
            Worker.find({}, function(err1, worker11) {
                if (err1) {
                    console.log(err1);
                } else {
                    var i = worker11.filter(t => t._id == plogs.assignWorker)[0].phoneno;
                    client.messages.create({
                        to: '+91' + i,
                        from: '+12058966497',
                        body: 'Name:' + plogs.name + "   " + 'Phone:' + plogs.phoneno + "   " + "Address:" + plogs.address + "    " + "Reason:" + plogs.reason + "   " + 'Due:' + plogs.assignDate
                    });
                    res.redirect('/admin');
                }
            });


        }
    });

});

router.get('/chart', function(req, res) {
    var chartobj = { total: 0, completed: 0, pending: 0, assigned: 0 };
    Request.find({}, function(err, re) {
        if (err) {
            console.log(err1);
        } else {
            re.forEach(element => {

                chartobj.total += 1;


                switch (element.status) {
                    case 'completed':
                        chartobj.completed += 1;
                        break;
                    case 'pending':
                        chartobj.pending += 1;
                        break;
                    case 'assigned':
                        chartobj.assigned += 1;
                        break;
                    default:
                        break;
                }
            });
            res.render('admin/chart', { chart: chartobj })
        }
    });

})

module.exports = router;