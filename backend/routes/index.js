var user = require ('../controller/user.js');
var express = require ('express');
var apiRoutes = express.Router();

module.exports = function(app) {    
    //app.use('/api', apiRoutes);
    app.post('/userRegister', user.register); // User Register
    app.get('/userList',user.usersList);
    app.post('/getSingleUser',user.getSingleUser);
    app.post('/updateUser',user.updateUser);
    app.post('/deleteUser',user.deleteUser);
    app.post('/login',user.login);
};
