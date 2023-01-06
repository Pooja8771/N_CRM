const authController = require('../controllers/authController');

module.exports = (app)=>  {
    app.post("/crm/signup",authController.signup);
    app.post("/crm/signin",authController.signin);
}