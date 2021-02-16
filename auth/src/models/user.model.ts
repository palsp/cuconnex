

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        studentId: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return User;
};