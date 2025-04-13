const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const employeeController = require('../controllers/employeeController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/employees', upload.single('employeeImage'), employeeController.addEmployee);
router.get('/employees', employeeController.getEmployees);
router.delete('/employees/:id', employeeController.deleteEmployee);
router.get('/employees/:id', employeeController.getEmployeeById);
router.put('/employees/:id', upload.single('employeeImage'), employeeController.updateEmployee);


module.exports = router;
