// auth.js middleware
const authMiddleware = (req, res, next) => {
    // console.log("Request session:", req.session); 
    // console.log("User is authenticated:", req.isAuthenticated()); 
    if (req.isAuthenticated()) {
      return next(); 
    } else {
      console.log("User is not authenticated");
      res.status(401).json({ success: false, message: "Unauthorized" }); 
    }
  };
  
  export default authMiddleware;
  