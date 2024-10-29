

// import express from "express";
// import cors from "cors";
// import foodRouter from "./routes/foodRoute.js";
// import userRouter from "./routes/userRoute.js";
// import expressSession from "express-session"
// import passport from "passport";
// import cartRouter from "./routes/cartRoute.js";
// // import authMiddleware from "../Node-Backend/middleware/auth.js";
// // const MongoStore = require('connect-mongo')(session);
// // import MongoStore from "connect-mongo";

// //  

// //  app configuration
// const app=express()
// const  port=4000;
// // to connect forntend and backend
// const corsOptions = {
//   origin: 'http://localhost:5173', 
//   credentials: true // Allow credentials (cookies, authorization headers, etc.)
// };

// // middleware
// app.use(express.json())
// app.use(cors(corsOptions));
// app.use(express.urlencoded({ extended: true }));


// // app.use(authMiddleware)

// // authentication code passportjs
// app.use(expressSession({
//   resave: false,
//   saveUninitialized: false,
//   secret: "Anything",
//   cookie: { secure: false }
// }));

//  app.use(passport.initialize())
//  app.use(passport.session())
// //   passport.serializeUser(userRouter.serializeUser())
// //   passport.deserializeUser(userRouter.deserializeUser())

// // app.use(authMiddleware);

// //   api endpoints 
// app.use("/api/food",foodRouter);
// app.use("/images",express.static('uploads'))
// app.use("/api/user",userRouter)
// app.use("/api/cart",cartRouter)


// // like routing ->get post.
// app.get("/",(req,res)=>{
//        res.send("API Working")
// })
// app.listen(port,()=>{
//    console.log(`Server Started oN http://localhost:${port}`)
// })

// // import express from 'express';
// // import cors from 'cors';
// // import foodRouter from './routes/foodRoute.js';

// // const app = express();
// // const port = 5173;

// // // CORS configuration
// // app.use(cors({
// //   origin: 'http://localhost:3000', // Replace with your frontend URL
// //   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
// //   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
// // }));

// // // Other middleware
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // Routes
// // app.use('/api/food', foodRouter);
// // app.use('/images', express.static('uploads'));

// // // Start server
// // app.listen(port, () => {
// //   console.log(`Server Started on http://localhost:${port}`);
// // });





// ***********
import express from "express";
import cors from "cors";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import expressSession from "express-session";
import passport from "passport";
import authMiddleware from "../Node-Backend/middleware/auth.js";
import orderRouter from "./routes/orderRoute.js";
import { connectDb } from "./config/mongodb.js";
// import foodDb from "./config/mongodb.js";
// for webtoken
import "dotenv/config"

const app = express();
const port =process.env.PORT||  4000;


// Middleware setup
app.use(express.json());
app.use(cors({
  // origin: 'http://localhost:5173',
  credentials: true
}));
// app.use(express.urlencoded({ extended: true }));

// setup for db connection
connectDb();
// Session configuration with MongoStore
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: "Anything",
  cookie: { secure: false }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user.id); // Save user.id to the session
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user); // Retrieve user object from the database based on user.id stored in session
  });
});


// Routes
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order",orderRouter);
// foodDb()
// Default route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});



