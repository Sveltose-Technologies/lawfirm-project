const express = require("express");
const { createRole, updateRole, deleteRole, getAllRoles } = require('../controllers/roleController.js');
const router = express.Router();

router.post('/create', createRole);
router.put('/update/:id', updateRole);
router.delete('/:id', deleteRole);
router.get('/getall', getAllRoles);


module.exports = router;
