var bodyParser = require('body-parser');
methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    express = require('express'),
    passport = require('passport'),
    app = express(),
    Req_route = require('./routes/request.js');
Admin_route = require('./routes/admin.js');
Workers = require('./routes/worker.js');
userRoutes = require('./routes/user.js');
port = process.env.PORT || 3000;
const session = require('express-session');
const flash = require('connect-flash');
const dbUrl = "mongodb+srv://Rmanager:rakshith@requestmanager.qxqre.mongodb.net/RQ_DB?retryWrites=true&w=majority";
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/users', userRoutes);

app.get('/', function(req, res) {
    res.render('landing');
});
app.get('/contact', function(req, res) {
    res.render('contact');
});

app.get('/about', function(req, res) {
    res.render('about');
});

app.get('', function(req, res) {
    Request.find({}, function(err, re) {
        if (err) {
            console.log('error');
        } else {
            res.render('admin/indexadmin', { requests: re });
        }
    });
});

app.put('/:id', function(req, res) {
    Request.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedReq) {
        if (!err) {
            res.redirect('/admin');
        } else {
            res.redirect('/admin/' + req.params.id);
        }
    });
});
app.get('/:id/edit', function(req, res) {
    Request.findById(req.params.id, function(err, foundReq) {
        if (err) {
            res.redirect('/admin');
        } else {
            res.render('admin/editadmin', { requ: foundReq });
        }
    });
});
app.use('/admin', Admin_route)
app.use(Req_route)

app.use(Workers)
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})