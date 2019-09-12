/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var User = require('../api/users/users.model');

User.countDocuments({}).exec((err, count) => {
  if (err) {
    console.error(err);
    return;
  }
  if (count == 0) {
    User.create({
        name : 'Gustavo Lopes',
        username : 'admin',
        password : 'admin'
    }, (err, seedUser) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Seed superuser created");

    })
  }

})