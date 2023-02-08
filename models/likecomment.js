'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class LikeComment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User, Comment }) {
            // define association here
            this.belongsTo(User, { foreignKey: 'user_id' });
            this.belongsTo(Comment, { foreignKey: 'comment_id' });
        }
    }
    LikeComment.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            comment_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
        },
        {
            sequelize,
            modelName: 'LikeComment',
        }
    );
    return LikeComment;
};
