const router = require("express").Router();
const contactController = require("../controller/contacts");
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', contactController.getAll);

router.get('/:id', contactController.getID);

router.get('/gender/:filter', contactController.getGender);

router.post('/', isAuthenticated, contactController.createContact);

router.put('/:id', isAuthenticated, contactController.updateContact);

router.delete('/:id', isAuthenticated, contactController.deleteContact);

module.exports = router;