
const member = require('../models/member')
const jwt = require('jsonwebtoken')
const request = require('request')
const env = require('dotenv')
const Member = require('../models/member')
const vaccination = require('../models/vaccination')


env.config()


const getAllMembers = (req, res) => {
    member.find().populate('history').then(data => res.send(data))
}

const addMember = async (req, res) => {
    const post = req.body
    const currentMember = new Member(post)
    try {
        console.log(post)
        await currentMember.save()
        console.log(currentMember)

        res.status(200).json({ massage: 'member created', myMember: member })
    }
    catch (err) {
        res.status(400).json({ message: err.massage })
    }
}

const getMemberById = async (req, res) => {
    try {
        // findById(req.params.id)
        const member = await Member.findOne({ id: req.params.id })
        console.log("member", member);
        if (member != null) {
            res.status(200).json({ message: 'member found', myMember: member })
        }
        else {
            res.status(200).json({ message: 'member not found' })
        }

    } catch (error) {
        res.json({ message: error.message });
    }
}

module.exports = { getAllMembers, addMember, getMemberById }
