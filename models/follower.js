'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Follower extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User }) {
            // define association here
            this.belongsTo(User, { foreignKey: 'follower_user_id',as: 'followers' });
            this.belongsTo(User, { foreignKey: 'following_user_id',as: 'followings' });
        }
    }
    Follower.init(
        {
            follower_user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            following_user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
        },
        {
            sequelize,
            modelName: 'Follower',
        }
    );
    return Follower;
};
