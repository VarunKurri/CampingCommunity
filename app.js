if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const session = require('express-session');
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const helmet = require('helmet');

const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const { MongoStore } = require('connect-mongo');
const MongoDBStore = require('connect-mongo')(session);
const dbUrl = 'mongodb://127.0.0.1:27017/campingCommunity';
// const dbUrl = process.env.DB_URL
// 'mongodb://127.0.0.1:27017/campingCommunity'

mongoose.connect(dbUrl)
    .then(() => {
        console.log("Database Connected!");
    })
    .catch ((err) => {
        console.log("Connection Error!");
        console.log(err);
    })

const app = express();

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize({
    replaceWith: '_'
}));

const store = new MongoDBStore({
    url: dbUrl,
    secret: 'thisshouldbeabettersecret',
    touchAfter: 24 * 60 * 60
});

store.on("error", function(e) {
    console.log("SESSION STORE ERROR!", e);
})

const sessionConfig = {
    store,
    name: 'session',
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet({ contentSecurityPolicy: false }));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.render('home');
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found!', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    if (!err.message) err.message = "Oh no! Something went wrong";
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('Serving on port 3000...');
})