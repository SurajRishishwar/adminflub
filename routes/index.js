const express = require('express');
const router = express.Router();
const passport = require('passport');

const adminController= require('../controllers/admin_home_controller');
router.get('/',adminController.adminhome);
router.get('/signup',adminController.signup);
router.post('/signin',passport.authenticate('local',{failureRedirect:'/'},),adminController.createsession);
router.get('/admin',passport.checkAuthenticate,adminController.aflog);
router.get('/userdetails',passport.checkAuthenticate,adminController.userdetails);
router.get('/userdetails2',passport.checkAuthenticate,adminController.userdetails2);
router.get('/regauser',passport.checkAuthenticate,adminController.regauser);
router.post('/reguser',passport.checkAuthenticate,adminController.reguser);
router.get('/workerdetails',passport.checkAuthenticate,adminController.workerdetails);
router.get('/admindetails',passport.checkAuthenticate,adminController.admindetails);
router.get('/userqueries',passport.checkAuthenticate,adminController.userqueries);
router.get('/workerquery',passport.checkAuthenticate,adminController.workerquery);
router.post('/assignadmin',passport.checkAuthenticate,adminController.assignadmin);
router.post('/createworker',passport.checkAuthenticate,adminController.createworker);
router.get('/logout',adminController.logout);
router.post('/createuser',adminController.createuser);
router.post('/transfertow',adminController.assignworker);




module.exports=router;