'use strict';

module.exports = (app) => {
    const userController = require('./controller/usercontroller');

    app.route('/biodata_diri')
        .get(userController.showAllBiodata)
        .post(userController.addNewBiodata)
        .delete(userController.deleteuser);

    app.route('/biodata_diri/:id')
        .get(userController.showBiodataById)
        .put(userController.updateBiodataById)
        .delete(userController.deleteuser);
};