import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {
    const {username, password, confirmPassword, firstName, lastName, phone, email} = req.body;

    if (!username || !password || !confirmPassword || !firstName || !lastName || !phone || !email) {
        return res.status(400).json({success: false, message: 'Please fill all the fields'});
    }

    try {

        const existingUser = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: existingUser.username === username 
                    ? 'Username already taken' 
                    : 'Email already registered'
            });
        }

        // Password validation
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters long'
            });
        }
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least one uppercase letter'
            });
        }
        if (!/[a-z]/.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least one lowercase letter'
            });
        }

        if (!/[0-9]/.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least one number'
            });
        }
        if (!/[!@#$%^&*]/.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must contain at least one special character'
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            });
        }  
        
        // Phone number validation
        if (!/^\d+$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: 'Phone number must contain only digits'
            });     
        }

        if (phone.length < 10) {
            return res.status(400).json({
                success: false,
                message: 'Phone number must be at least 10 digits long'
            });         
        }

        //email validation

        if (!/[@.]/.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Email must contain @ and .'
            });
        }
        if (email.length < 5) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Replace plain password with hashed password
        const newUser = new User({username, password: hashedPassword, firstName, lastName, phone, email});

        const data = await newUser.save();
        res.status(201).json({success: true, message: "User created successfully", user: data})
    } catch(error) {
        res.status(500).json({success: false, message: error.message});
    }
}



export const loginUser = async (req, res) => {
    const payload = req.body;

    if ((!payload.username && !payload.email) || !payload.password) {
        return res.status(400).json({
            success: false, 
            message: 'Please fill required fields'
        });
    }

    try {
        // Check if user exists
        const user = await User.findOne({
            $or: [
                { username: payload.username },
                { email: payload.email }
            ]
        });

        if (!user) {
            return res.status(409).json({
                success: false,
                message: payload.username 
                    ? 'Profile does not exist' 
                    : 'Email not registered'
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
            payload.password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' } // Token expires in 24 hours
        );

        // Send response with token
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: user
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}