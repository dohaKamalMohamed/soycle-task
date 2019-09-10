const express=require('express');
      bodyParser=require('body-parser');
      cors=require('cors');
      path=require('path');
      register=require('../routes/register');
      auth=require('../routes/auth');
      shop=require('../routes/shop');
module.exports=function(app){
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(express.static(path.join(__dirname,'dist/Task')));
    app.use('/',express.static(path.join(__dirname,'dist/Task'))); 
    app.use('/users',register); 
    app.use('/auth',auth);
    app.use('/shop',shop);  
}      