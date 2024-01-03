const User = require('../Models/Users/user.js');

exports.signup = async (req, res) => {
    try {
        const { username, email, mobile, password } = req.body;
        const newUser = new User({ username, email, mobile, password });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    try{
        const {username, email, mobile, password} = req.body;

        if(!(username || email || mobile)){
            return res.status(400).json({ error: 'Please provide username, email, or mobile for login' });
        }
        const user = await User.findOne({ $or: [{ username }, { email }, { mobile }] });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isPasswordMatch = await user.comparePassword(password);

        if (isPasswordMatch) {
            res.json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
