const db = require("../models");
const { Op } = db.Sequelize;
const { users } = db

// Find an Existing user
const findUser = async (email, phoneNumber) => {
    let where;
    // case in which phoneNumber is given
    if (phoneNumber) {
        where = {
            where: {
                [Op.or]: [
                    { phoneNumber },
                    { email }
                ], isActive: true
            }
        }
    }
    // Case in which phoneNumber is not given
    else {
        where = {
            where: { email, isActive: true }
        }
    }
    const user = await users.findOne({
        ...where
    });
    return user;
}

// Create a user
const makeUser = async (dto) => {
    const user = await users.create({ ...dto, isActive: true })
    return user;
}

// Create a user
const userExistsById = async (id) => {
    const user = await users.findOne({
        where: { id, isActive: true }
    })
    return user;
}


module.exports = { makeUser, findUser, userExistsById }