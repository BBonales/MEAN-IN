const { Router } = require('express');
const router = Router();

const useController = require('../controllers/user.controller');

router.post('/signup',useController.createUser);
router.post('/signin',useController.getSingIn);
router.get('/list-users',useController.verifyToken,useController.getUsers);
router.delete('/:id',useController.deleteUser);
router.get('/list-users/:name/:hobby',useController.verifyToken,useController.getFilterUser);
router.get('/specific-list',useController.verifyToken,useController.getSpecificList);

module.exports=router;