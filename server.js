const express = require('express')
const app = express()
const mongoose=require('mongoose');
const cors = require('cors');
const db=require('./models/schema.js');
const { exercise } = require('./models/schema.js');
const { request } = require('express');
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
          
          //  let k=db.user.findOne({username:name});

              
           
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

      //  console.log(req.params);

        let date=req.body.date;
       let newExercise=new db.exercise({
      
                                          description:req.body.description,
                                           
                                           duration:req.body.duration,

                                            date:new Date(date).toString().substring(0,15)
      
      
      
      });

          if(newExercise.date=='Invalid Date')
          {
            newExercise.date=new Date().toString().substring(0,15);
          }


      db.user.findByIdAndUpdate(req.params._id,
          
           
        {$push:{log:newExercise}},
        
        {new:true},
        (err,data)=>{
          
           res.send(data);
        }

    
)

        })


  app.get("/api/users/:_id/logs",async (req,res)=>{

       


    const exerciseDetails= await db.user.findOne({_id:req.params._id});

    let limit=exerciseDetails.log.length;
        
         if(req.query.limit)
           limit=req.query.limit

           var from=new Date(0);
           let to=new Date();
           
             if(req.query.fromDate)
               from=new Date(req.queryfromDate).toString().substring(0,15);

               if(req.query.toDate)
               to=new Date(req.querytoDate).toString().substring(0,15);


                

      db.user.findByIdAndUpdate(req.params._id,{count:exerciseDetails.log.length,log:exerciseDetails.log.slice(0,limit),log:exerciseDetails.log.filter((x)=>{

         let t=x.date;

           return from>=t&&to<=t;

      })},{new:true},(err,data)=>{

          
         res.send(exerciseDetails);

      })
       
    

       
  });



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})