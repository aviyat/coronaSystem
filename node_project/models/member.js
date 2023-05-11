const mongoose = require('mongoose');
const memberSchema = mongoose.Schema({

    memberFirstName: {
        type: String,
        required: true
    },
    memberLastName: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,


    },
    adress: {
        type: Object
    },
    bornDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (date) {
                return date <= new Date();
            },
            message: props => `${props.value} is not a valid birthdate`
        },
    },
    phone: {
        type: Number,
        min: 9
    },
    mobilePhone: {
        type: Number,
        min: 9
    },

})
module.exports = mongoose.model('members', memberSchema)