const USER = require('../models/user');
const {v4: uuidv4} = require('uuid')
const {setUser} = require('../servers/auth');

async function handlesignin(req, res) {
    const {name, email, password} = req.body;
    await USER.create({
        name,
        email,
        password
    })

    res.redirect('/login');
}

async function handlelogin(req, res) {
    const {email, password} = req.body;
    const user = await USER.findOne({email, password});

    if(!user){
        return res.render('pages/login.ejs',{
            error: 'Invalid email or password',
        });
    }
    const sessionid = uuidv4();
    setUser(sessionid, user);
    res.cookie("uid", sessionid); 
    return res.redirect('/');
}

module.exports = {handlesignin, handlelogin}