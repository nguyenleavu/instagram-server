'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User, Like, Comment }) {
            // define association here
            this.belongsTo(User, { foreignKey: 'user_id' });
            this.hasMany(Like, { foreignKey: 'post_id', as: 'likes' });
            this.hasMany(Comment, { foreignKey: 'post_id', as: 'comments' });
        }
    }
    Post.init(
        {
            caption: DataTypes.STRING,
            user_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            media_file: {
                type: DataTypes.JSON,
                defaultValue: [],
            },
        },
        {
            sequelize,
            modelName: 'Post',
        }
    );
    return Post;
};
