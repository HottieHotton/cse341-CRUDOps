const router = require("express").Router();
const addressController = require("../controller/addresses");

router.get('/', addressController.getAll);

router.get('/:id', addressController.getID);

router.post('/', addressController.createAddress);

router.put('/:id', addressController.updateAddress);

router.delete('/:id', addressController.deleteAddress);

module.exports = router;