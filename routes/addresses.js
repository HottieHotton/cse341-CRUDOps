const router = require("express").Router();
const addressController = require("../controller/addresses");
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', addressController.getAll);

router.get('/:id', addressController.getID);

router.post('/', isAuthenticated, addressController.createAddress);

router.put('/:id', isAuthenticated, addressController.updateAddress);

router.delete('/:id', isAuthenticated, addressController.deleteAddress);

module.exports = router;