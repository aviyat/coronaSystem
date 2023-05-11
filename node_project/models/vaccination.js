
const mongoose = require('mongoose')

const vaccinationSchema = mongoose.Schema({
  
    dosesVaccination: {
        type: Array,
    },
    datePositiveResult: {
        type: Date,
    },
    dateRecovery: {
        type: Date,
    },
    memberId: {
        type: String
    }

})
module.exports = mongoose.model('vaccinations', vaccinationSchema)