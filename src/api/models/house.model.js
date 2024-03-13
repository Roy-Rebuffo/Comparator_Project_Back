const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const houseSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        foundation: {type: String, required: true}, 
        picture: {type: String}, 
    },{
        timestamps: true
    }
)

const House = mongoose.model('house', houseSchema);

module.exports = House;