const router = require("express").Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const passport = require('passport');

router.get('/login', passport.authenticate('github', (req,res) =>{}));
router.get('/logout', function(req,res,next) {
  req.logout(function(err){
    if(err){return next(err)}
    res.redirect('/');
  });
});


//Utilizing Swagger Documentation
var options = {
  swaggerOptions: {
      url: "/api-docs/swagger.json",
  },
}

router.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));
router.use('/api-docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options));

router.get('/');

router.use('/contact', require("./contact"));
router.use('/addresses', require("./addresses"));

module.exports = router;