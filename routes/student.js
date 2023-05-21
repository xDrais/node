const express = require('express');

const router = express.Router();

var Student = require('../models/student.js')

const mongoose = require('mongoose');


//get student list 

router.get('/',async(req,res,next)=>{
    const student = await Student.find();
    res.json(student);

});


//add student 


router.post('/',(req,res,next)=>{
    var student = new Student({Name: req.body.studentname , Age: req.body.studentage , Class: req.body.studentclass,Note: req.body.studentnote });

    student.save((err)=>{
        if(err)
        {
            console.log(`there is an error ${err} `);
        }
        else{
            res.json(student)
        }
    })
    
}
    );




//find student by id

router.get('/:id',async (req, res) => {
    
        const user =  await Student.findById(req.params.id);
        res.json(user);

})



//delete student

router.delete('/:id',async (req, res) => {

    const user =  await Student.findById(req.params.id);
    user.deleteOne();
    res.json({user:'deleted'});

}) 



//update student

router.post('/:id',async (req, res) => {

    const user =  await Student.findById(req.params.id);
    user.Name =req.body.studentname;
    user.Age=req.body.studentage;
    user.Class=req.body.studentclass;
    user.Note=req.body.studentnote;
    user.save();
    res.json(user);
    
})


// get student age > 18

router.get('/age',async (req, res) => {

    const student = await Student.find();

    function age18(x) {

        return x > 18;

   }

    users= student.forEach(age18)

    res.json(student);

})




module.exports = router;
