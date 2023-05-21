const express = require('express')
const router = express.Router()
path=require('path')


router.get('/',(req,res,next)=>{
//res.sendFile(path.join(__dirname, '..', 'views', 'chat.html'))
res.sendFile('C:/Users/xDrais/Desktop/examen node/examen_nodejs_2info2/views/chat.html');

})


module.exports = router;