/**
 * Main application routes
 */

'use strict';


module.exports = function(app) {
    app.use('/api/v1/auths', require('./api/auths'));
    app.use('/api/v1/vendors', require('./api/vendors'));
    app.use('/api/v1/tasks', require('./api/tasks'));
    app.use('/api/v1/intimations', require('./api/intimations'));
    app.use('/api/v1/processos', require('./api/processos'));
    app.use('/api/v1/clientes', require('./api/clientes'));
    
    
};