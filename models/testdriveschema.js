const mongoose = require('mongoose');

const testdriveSchema = new mongoose.Schema({
    fnameTestDrive:{
        type:String,
        required: false
    },
    lnameTestDrive:{
        type:String,
        required: false
    },
    emailTestDrive:{
        type:String,
        required: false
    },
    phoneNumberTestDrive:{
        type:String,
        required: false
    },
    yearTestDrive:{
        type:String,
        required: false
    },
    makeTestDrive:{
        type:String,
        required: false
    },
    modelTestDrive:{
        type:String,
        required: false
    },
    vinNumberTestDrive:{
        type:String,
        required: false
    },
    dealershipNameTestDrive:{
        type:String,
        required: false
    },
    dateTestDrive:{
        type:String,
        required: false
    },
    timeTestDrive:{
        type:String,
        required: false
    },
    location:{
        type:String,
        required: false
    },
    street:{
        type:String,
        required: false
    },
    city:{
        type:String,
        required: false
    },
    province:{
        type:String,
        required: false
    },
    postalCode:{
        type:String,
        required: false
    },
    timestamp:{
        type:Date,
        default: Date.now
    }
});


const TestDrive = mongoose.model('TestDrive',testdriveSchema);

module.exports = TestDrive;