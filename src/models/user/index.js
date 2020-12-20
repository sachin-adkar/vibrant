const UserModel = require('./schema');

class User {

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