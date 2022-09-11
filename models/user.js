const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    email:{
        type: String,
        require: true,
        unique: true
        
    },
    password:{
        type: String,
        require: true
    },
    name:{
        type: String,
        required: true
    }
},{
    timestamps: true
}
);

const user=mongoose.model('user',userSchema);

module.exports=user;