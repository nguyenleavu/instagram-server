'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User, Post }) {
            // define association here
            this.belongsTo(User, { foreignKey: 'user_id' });
            this.belongsTo(Post, { foreignKey: 'post_id' });
        }
    }
    Like.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            post_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
        },
        {
            sequelize,
            modelName: 'Like',
        }
    );
    return Like;
};
