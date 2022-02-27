const mongoose=require('mongoose');
const schema=mongoose.Schema;
const ExerciseSchema=new schema({

    
     _id:{
         
          type:String,
           required:true

     },

      description:{
  
         type:String,
         required:true
            

      },
      duration:{

         type:Number,
         required:true


      },

       date:{
           type:String,
           required:true
       }
  

});

const  userSchema=new schema({

     username:{
         type:String,
         required:true
     },

     log:[ExerciseSchema],
     count:{
          type:Number,
          default:0
     }



})

let exercise=mongoose.model('Exercises',ExerciseSchema);
let user=mongoose.model('Users',userSchema);

 module.exports={

      exercise:exercise,
      user:user

 }