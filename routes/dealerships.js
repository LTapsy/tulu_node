const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {v4: uuidv4} = require('uuid');
const {ensureAuthenticated, authRole} = require('../config/auth');
const uploadController = require("../controllers/upload");
const fetchImage = require("../middleware/getImages");

var uuid = uuidv4();
var targetId = uuid;

// Dealer Model
const Dealer = require('../models/dealershipschema');
const Address = require('../models/addressschema');

// Add Dealership Page
router.get('/dashboardSysAdminDealership',(req,res)=>
    res.render("DashboardSysAdminDealership", {
        user: req.user,
    })
);

// Add Dealership Handle
router.post('/dashboardSysAdminDealership',(req,res)=>{
    console.log(req.body);
    // res.send('hello');
    const { name,logo,website,street,city,province,postal} = req.body;

    let errors = [];

    // Check required fields
    if(!name||!logo||!website||!street||!city||!province||!postal){
        errors.push({msg:'Please fill in all fields'});
    }


    if(errors.length > 0){
        res.render('DashboardSysAdminDealership',{
            errors,name,logo,website,street,city,province,postal
        });
    }else{
        // res.send('Pass');

        // Validation Passed
        Dealer.findOne({website:website})
        .then(dealer=>{
            if(dealer){
                // dealerExist Exist
                errors.push({msg:'Email already Exist'})
                res.render('DashboardSysAdminDealership',{
                    errors,name,logo,website,street,city,province,postal
                })
            }else{
                const newDealer = new Dealer({
                    errors,uuid,name,logo,website
                });
                const newAddress = new Address({
                    errors,targetId,street,city,province,postal
                });

                newDealer.save()
                .then(dealer => {
                    newAddress.save()
                    .then(address=>{
                        req.flash('Adding New Dealer Success!');
                        res.redirect('/dealerships/DashboardSysAdminDealership')
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
                // console.log(newUser)
                // res.send('hello');
            }
        });
    }
});


router.post("/upload/:type/:targetid", uploadController.uploadFile), (req, res) => {
    console.log(req)
};

router.get('/EditDealer',ensureAuthenticated,(req,res)=>
    Dealer.find({uuid:req.user.toObject().dealerId})
    .then(dealer=>{
        Address.find({targetId:req.user.toObject().dealerId})
        .then(address=>{
            res.render('EditDealer',{
                user:req.user,
                dealer:dealer,
                address:address
            })
        })
    })
);

router.post('/EditDealer',(req,res)=>{
    var myquery = { uuid: req.user.toObject().dealerId };
    var myqueryAddress = { targetId: req.user.toObject().dealerId };
    const { name,logo,website,street,city,province,postal} = req.body;
    var newvalues = {
        name: name,
        logo: logo
    };

    var newaddressvalues = {
        website: website,
        street: street,
        city: city,
        province: province,
        postal: postal
    }
        Dealer.updateOne(myquery, newvalues)
        .then(dealer=>{
            Address.updateOne(myqueryAddress, newaddressvalues)
            .then(address=>{
                req.flash('success_msg', 'Changes Saved!');
                res.redirect('/dealerships/EditDealer')
            })
        })
});


module.exports = router;