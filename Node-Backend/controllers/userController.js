import userModel from "../models/userModel.js";
import passport from 'passport';
import LocalStrategy from 'passport-local';

passport.use(new LocalStrategy(userModel.authenticate()));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    userModel.findById(id, (err, user) => {
        done(err, user);
    });
});

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    if (!validateEmail(email)) {
        return res.json({ success: false, message: "Invalid email format" });
    }
    try {
        const emailExists = await userModel.findOne({ email });
        const userExists= await userModel.findOne({username})
        if (emailExists) {
            return res.json({ success: false, message: "Email is already used" });
        } 
        else if(userExists){
            return res.json({ success: false, message: "UserName already Exists" });
        }else {
            const newUser = new userModel({
                username: username, 
                email: email
            });

            await userModel.register(newUser, password);
            
            // Authenticate user after registration
            passport.authenticate('local')(req, res, function () {
                return res.json({ success: true, message: 'Registration successful' });
            });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const loginUser = async (req, res,next) => {
    
    passport.authenticate("local",(err,user,info)=>{
        if(err){
            return res.json({ success: false, message: "Authentication failed", error: err });
        }
        if (!user) {
            return res.json({ success: false, message: "Invalid username or password" });
        }
        // we need to add serialize and deserial user functions
        req.logIn(user, (err) => {
            if (err) {
                console.error('Login error:', err);
                return res.json({ success: false, message: "Login failed", error: err });
            }
            return res.json({ success: true, message: "Login successful", user: user });
        });
    })(req, res, next);
};
const userProfile =async (req,res)=>{
    if(req.isAuthenticated()){
        res.json({ user: req.user });
    }
}


export { loginUser, registerUser ,userProfile };
