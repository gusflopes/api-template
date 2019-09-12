'use strict';

module.exports = {

    secrets: {
        session: "lego-api-template",
        expiresIn: 2629746000
        //Expiração em 10 minutos paraquando implementar o refresh token
        //expiresIn: 604800
    },

    db:{
        URI: 'mongodb://localhost:27017/vendor_erp'
    }
}