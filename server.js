const express = require('express')
const app = express()
const mongoose=require('mongoose');
const cors = require('cors');
const db=require('./models/schema.js');
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const dB='mongodb+srv://tush17:test1234@cluster0.fbxqa.mongodb.net/Exercise-Tracker?retryWrites=true&w=majority';
app.use(express.urlencoded({extended:false}));
mongoose.connect(dB,{
  useNewUrlParser:true,
  useUnifiedTopology:true

});


app.post('/api/users', (req,res)=>{

         let name=req.body.username;
          
           let k=db.user.findOne({username:name});

              
           
    let newUser=new db.user({username:name}); 

    newUser.save((err,saved)=>{

       if(!err)
       {
          let x={};
           x.username=saved.username,
           x._id=saved.id;

           res.json(x);

       }
 
        else
        res.send({});
    });
  

});


  app.get('/api/users',async (req,res)=>{
    
    
         const userDetails= await db.user.find();

          res.send(userDetails);

  })

  app.post('/api/users/:_id/exercises',(req,res)=>{

     
       let newExercise=new db.exercise({_id:req.params._id,
      
                                          description:req.body.description,
                                           
                                           duration:req.body.duration,

                                            date:req.body.date 
      
      
      
      });

         newExercise.save((err,data)=>{

             if(!err)
             {
               let x={}
                x._id=data._id,
                 x.description=data.description
                 x.duration=data.duration
                 x.date=data.date

                  res.json(x);
             }

              // else
              // res.send(err);



         })





  });




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})