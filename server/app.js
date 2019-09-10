const express= require('express');
      app=express();


   require('./startUp/db')(); 
   require('./startUp/config'); 
   require('./startUp/routes')(app);   


const port= process.env.PORT ||3000;
app.listen (port,()=>console.log(`application listening to port ${port}`));


require('./startUp/handleError')(app);