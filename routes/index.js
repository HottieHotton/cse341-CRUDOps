const router = require("express").Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

//Utilizing Swagger Documentation
var options = {
  swaggerOptions: {
      url: "/api-docs/swagger.json",
  },
}

router.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));
router.use('/api-docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options));

router.get('/', (req, res) => { res.send("Hello World.");})

router.use('/contact', require("./contact"));
router.use('/addresses', require("./addresses"));

module.exports = router;