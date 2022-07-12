var express = require('express');
const Student = require("../model/student");
var router = express.Router();

/* GET home page. */
router.get('/hi', function(req, res, next) {
  res.render('index', { title: 'Express course' });
});

// get all student information 


router.get("/all", async function(req,res,next){

    try{
      const totalStudents = await Student.find();
          res.json(totalStudents);
    }catch(error){
        res.status(500).json("error notification", error.message)
          res.status(404).json("error notification",error.message);
    }
    // console.log("i am a trainer");
    // console.log("i am a software course trainer");

})



router.post('/addstudent',function(req,res,next){
 // business logic 

   const student = new Student({
     name:req.body.name,
     id:req.body.id,
     email:req.body.email
   });

   try {
      const studentinfo = student.save();
      res.status(200).json("i have inserted student data");
   } catch(error){
    res.status(500).json("error notification", error.message)
      res.status(404).json("error notification",error.message);
}

});
// update existing data
// put

  router.put('/update/:id',async(req,res)=> {

    const student = new Student({
      _id: req.params.id,
      name: req.body.name,
      id: req.body.id,
      email: req.body.email,
     
    });
    Student.updateOne({_id: req.params.id}, student).then(
      () => {
        res.status(201).json({
          message: 'updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
 

  })



// remove the student data
// delete
router.delete('/students/:id',async(req,res)=> {
  console.log(" this is one");
  Student.remove({_id:req.params.id})
    .then(student => {
      console.log(" this is two");
        if(!student) {
            return res.status(404).send({
                message: "student not found with id " + req.params.id
            });
        }
        res.send({message: "student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "student not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.id
        });
    });



})



module.exports = router;
