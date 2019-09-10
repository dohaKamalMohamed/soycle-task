module.exports=function(app){
    app.use(function(err,req,res,next){
      console.error(err.message);
      return res.status(505).json(err.message);
    })
 }