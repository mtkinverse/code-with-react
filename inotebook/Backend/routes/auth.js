const express = require('express');
const router = express.Router();
const User = require('../modules/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Signature = 'A_SecretPassword_ForSignature';
const fetchUser = require('../middleware/fetchuser');
const success = false;
// if(Signature === null){console.log("Not found ")}else {console.log(Signature)};
// ==>> ROUTE 1 ; Creating User , endpoint : /api/auth/createUser
router.post('/createUser', [
    // Checking with bcrypt according to the body of the request : name,email,password
    body('name', 'Enter a valid name').isLength({ min: 4 }),
    body('email', 'Enter a valid email address').isEmail(),
    body('password', 'Password must be of 4 characters').isLength({ min: 4 })
],
    async (req, res) => {

        try {

            if (await User.findOne({ email: req.body.email })) {
                //User module can invoke a findOne() method (async, have to wait) for signup (creating user) purpose no user should be found having the same email ; therefore, if it comes true we dont have to bother the server and return from here with a bad status (400) and error message 
                return res.status(400).json({ success,error: 'A user with the email address already exist ; please enter a unique email address' })
            }

            const result = validationResult(req);// this will validate result according to the defined body and conditions with bcrypt
            if (!result.isEmpty()) {
                //if this result is !empty this , state that it contains error
                return res.status(400).json({ success,error: result.array() });
            }


            const salt = await bcrypt.genSalt(10);//using bcrypt builtin function genSalt() of 10 chars
            const secPass = await bcrypt.hash(req.body.password, salt);// generating hash w.r.t the generated salt

            const user = await User.create({//creating user with secured password

                name: req.body.name,
                email: req.body.email,
                password: secPass

            })

            const data = {
                user: { id: user.id }
            }
            const authToken = jwt.sign(data, Signature);//jsonwebtoken requires an object , which is data here , and the signature 

            res.json({ success:!success,authToken });

        } catch (error) {

            console.error(error.message);
            res.status(500).json({success,error:"Something went wrong ! "});

        }
    })

// ==>> ROUTE 2 ; Make user login , endpoint : /api/auth/login

router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
   
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({success, error: result.array() })
    }

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({success, error: 'Kindly be precised while entering your data' });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({success, error: 'Kndly be precised while entering your credentials' });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, Signature);
        
        res.json({success:!success,authToken });

    } catch (error) {

        console.error(error.message);
        res.status(500).json({success,error:"An internal sever error occured !"});

    }

})

// ==> Route 3 : Seeking Details of user

router.post('/seekUser', fetchUser, async (req, res) => {

    try {

        const userID = req.user.id;
        const user = await User.findById(userID).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("An internal server error occured !");
    }

})

module.exports = router;