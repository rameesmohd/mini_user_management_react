const express = require('express')
const mongoose = require('mongoose');
const app = express()
const cors= require('cors')
const userRouter =require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/admin',adminRouter)
app.use('/',userRouter);

const port = 5000;
mongoose.connect('mongodb://127.0.0.1:27017/react-user-management')
  .then(() =>{ 
    app.listen(port , ()=>console.log(`server port ${port}`))
    console.log('db Connected!')
})

