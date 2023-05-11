const env = require('dotenv')
const Vaccination = require('../models/vaccination')
const mongoose = require('mongoose');
const vaccination=require('../models/member')
const Member = require('../models/member')



const addVaccinattionByMember = async (req, res) => {
        const post = req.body
        const detailse = new Vaccination(post)
        try {
            console.log(post)
            await detailse.save()    
            res.status(200).json({ massage: 'details created' })
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ message: err.massage  })
        }
}
const getVaccinattionByMember = async (req, res) => {
    let memberId = req.params.memberId;
    Vaccination.find({ memberId: memberId }).then((vaccinattion) => {
            res.status(200).json({
                vaccinattion
            })
        }).catch(err => {
            console.log('~!~',err);
            res.status(500).json({
                err
            })
        });
}
const updateVaccination = (req, res) => {
    Member.findOneAndUpdate({ id: req.params.id }, req.body)
        .then(data => { res.status(200).json({ massage: ' update sucsessfuly' }) })
        .catch(err => { res.status(400).send(err) })
}

module.exports = { addVaccinattionByMember, getVaccinattionByMember,updateVaccination }