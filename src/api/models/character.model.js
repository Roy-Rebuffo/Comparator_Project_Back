const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const characterSchema = new Schema(
    {
        name: {type: String, required: true},
        actor: {type: String, required: true},
        description: {type: String, required: true},
        picture: {type: String}
     
    },{
        timestamps: true
    }
)


const Character = mongoose.model('character', characterSchema);


module.exports = Character;
