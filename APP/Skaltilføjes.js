//Create Database
//-----------------------------------------------------
// var test = [];
//   obj["QueryString"].split(";").forEach(element => {
//     test.push(element+ ";");
//   });
// test.pop();
//  test.forEach((element,id) => {
//      con.query(element, err =>{
//       console.log(id);
//       if(id == test.length-1) console.log("done");
//      });
//  });
//-----------------------------------------------------

// app.use(flash());

// PASSPORT CONFIGURATION
// app.use(require("express-session")({
//     secret: "spil",
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(function(req, res, next){
//     res.locals.currentUser = req.user;
//     res.locals.error = req.flash("error");
//     res.locals.success = req.flash("success");
//     next();
// });