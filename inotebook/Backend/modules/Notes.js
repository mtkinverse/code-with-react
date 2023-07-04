const mongoose = require('mongoose');
const {Schema} = mongoose;
const NoteSchema = new Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    title :{
        type : String , required : true
    },
    description : {
        type : String , required : true
    },
    comments :{
        type : String , default : 'Add a comment to your note'
    },
    date : {
        type : String , default : Date.now
    }
})

module.exports = mongoose.model('Notes',NoteSchema);