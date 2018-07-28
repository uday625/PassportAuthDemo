var     express                 = require("express")
        mongoose                = require("mongoose"),
        passport                = require("passport"),
        bodyParser              = require("body-parser"),
        LocalStrategy           = require("passport-local")  ,
        passportLocalMongoose   = require("passport-local-mongoose"),
        User                    = require("./models/user")

mongoose.connect("mongodb://localhost/auth_demo_app",(err, res) => {
if (err) throw err;
console.log('Database online');
});

var app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
    secret: "Kolkata is the city of joy!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.set ('view engine', 'ejs');

//==========
// ROUTES
//==========


//INDEX ROUTE
app.get("/", (req,res)=>{
    res.render("home");
});


//SECRECT ROUTE
app.get("/secret", isLoggedIn, (req,res)=>{
    res.render("secret");
});

//AUTH ROUTES
//show sign up form

app.get("/register",(req,res)=>{
    res.render("register");
})

//handles user sign up
app.post("/register",(req,res)=>{
    
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,()=>{
            res.redirect("/secret");
        })
    })
    
})

//LOGIN ROUTES
//render login form

app.get("/login",(req,res)=>{
    res.render("login");
})


//login logic
//middleware
app.post("/login", passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req,res)=>{
    
})

app.get("/logout", (req,res)=>{
    req.logout();
    res.redirect("/");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started...");
});