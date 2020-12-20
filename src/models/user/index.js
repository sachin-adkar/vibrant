const UserModel = require('./schema');

/**
 * Interactions with user collection
 *
 * @class User
 */
class User {

    /**
     * Creates a new entry in the user collection
     *
     * @static
     * @param {*} params
     * @returns
     * @memberof User
     */
    static async saveUser(params) {
        try {
            const UserData = new UserModel(params);
            return new Promise((resolve, reject) => {
                UserData.save((error, result) => {
                    if (error) {
                        if (error.code == 11000) {
                            reject({ status: 409, message: 'User already exists' });
                        }
                        reject(error);
                    }
                    resolve(result);
                });
            })
        } catch (error) {
            throw error;
        }
    }


    /**
     *Returns the user data using email
     *
     * @static
     * @param {*} params
     * @returns
     * @memberof User
     */
    static async getUser(params) {
        try {
            const user = await UserModel.findOne({ email: params.email }).exec();
            if (!user) {
                throw { status: 400, message: 'User not found' };
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Returns the user data using userId
     *
     * @static
     * @param {*} userId
     * @returns
     * @memberof User
     */
    static async getUserById(userId) {
        try {
            const user = await UserModel.findOne({ _id: userId }).exec();
            if (!user) {
                throw { status: 400, message: 'User not found' };
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = User;