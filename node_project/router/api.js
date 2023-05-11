
const member = require('../controller/member')
const router = require('express').Router()
const vaccination = require('../controller/vaccination')

router.post('/addMember', member.addMember)
router.get('/getAllMembers', member.getAllMembers)
router.get('/getMemberById/:id', member.getMemberById)
router.post('/addVaccinattion/', vaccination.addVaccinattionByMember)
router.get('/getVaccinattionByMember/:memberId', vaccination.getVaccinattionByMember)
router.patch('/updateVaccination/:memberId', vaccination.updateVaccination)

module.exports = router
