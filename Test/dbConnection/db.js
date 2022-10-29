const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Database:123@first.mlcin1o.mongodb.net/?retryWrites=true&w=majority',(error)=>{
    if(error){
        console.log('dataBase is not connected',error.message);
    }else{
        console.log('Database is connected')
    }
})
