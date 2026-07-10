if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError.js");
const listingsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/reviews.js");
const usersRouter = require("./routes/user.js")

const session = require("express-session");
const MongoStore = require('connect-mongo').default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");






let port = 8080;



const store = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("Mongo Session Store Error:", err);
});

const sessionOption = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};



app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());







app.set("view engine" , 'ejs');
app.set("views" , path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demouser" , async (req , res)=>{
//     let fakeUser = new User({
//         email:"student@gmail.com",
//         username:"delta-student"
//     });

//     let registerUser  = await User.register(fakeUser, "helloWorld");
//     res.send(registerUser);
// })

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/" , usersRouter);



//creating a simple datbase for checking if its working or not correctly.......
// app.get("/testlisting", async (req,res)=>{
//     let sampleListing = new Listing({
        
//         title : "new home",
//         description: "welcome to your new home guys ",
//         price: 1200,
//         location: "New delhi",
//         country: "india",
//     });

//     //saving data into the database......
//     await sampleListing.save();
//    console.log("sample was saved");
//    res.send("its working perfectly");

// });

//if client call a invalid route 
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

//middleware error handler
app.use((err,req,res,next) =>{
   let {statusCode=500 , message="something went wrong"} = err;
    res.status(statusCode).render("error.ejs" , {message});
    //res.status(statusCode).send(message);
});
 
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
});
// app.get("/" , (req,res) => {
//     res.send("working")
// });