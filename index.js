const express = require('express');
const mongoose = require('mongoose');
const port = 8000;
const app = express();
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const URL = require('./models/url');
const userRoutes = require('./routes/user');
const urlRoute = require('./routes/url');
const staticsRouter = require('./routes/staticsroutes');
const {restrickedToLoggedInUserOnly, checkAuth} = require('./middleware/auth')

mongoose
.connect('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log('mongoose connect'))
.catch((err) => console.log('error', err));


app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());



app.use('/url', restrickedToLoggedInUserOnly, urlRoute);
app.use('/user', userRoutes);
app.use('/', checkAuth, staticsRouter);



//about page...
app.get('/about', async (req, res) => {
    
    res.render('pages/about');
})

app.get('/url/:shortid', async (req, res) => {
    const shortid = req.params.shortid;
    const entry = await URL.findOneAndUpdate(
        {
            shortid
        },
        {
            $push: {
                visitedhistory: 
                {
                    timestamp: Date.now()
                }
            }
        }
    );
    return res.redirect(entry.redirectid);
})



app.listen(port, () => console.log(`server started at port: ${port}`));