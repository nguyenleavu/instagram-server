'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User, Post,LikeComment }) {
            // define association here
            this.belongsTo(User, { foreignKey: 'user_id' });
            this.belongsTo(Post, { foreignKey: 'post_id' });
            this.hasMany(LikeComment, { foreignKey: 'comment_id', as: 'likeComments' });
        }
    }
    Comment.init(
        {
            comments: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Comment',
        }
    );
    return Comment;
};
