

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
import expressSession from "express-session";
import passport from "passport";
import cartRouter from "./routes/cartRoute.js";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import authMiddleware from "../Node-Backend/middleware/auth.js";

const app = express();
const port = 4000;

// MongoDB connection setup with Mongoose
mongoose.connect("mongodb://127.0.0.1:27017/FOODDELIVERYAPP", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));

// Session configuration with MongoStore
app.use(expressSession({
  secret: 'anything',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb://127.0.0.1:27017/FOODDELIVERYAPP", // MongoDB connection URL
    collectionName: "sessions", // Optional, specify the collection name for sessions
    ttl: 24 * 60 * 60, // Optional, session TTL (time to live) in seconds
    autoRemove: "interval",
    autoRemoveInterval: 10, // Optional, interval in seconds to clear expired sessions
    crypto: {
      secret: "anything", // Optional, encryption secret
    },
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }),
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
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

// Default route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});



