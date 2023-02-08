'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(model) {
            // define association here
            this.hasMany(model.Post, { foreignKey: 'user_id' });
            this.hasMany(model.Like, { foreignKey: 'user_id', as: 'likes' });
            this.hasMany(model.StoryStatus, { foreignKey: 'user_id', as: 'isSeen' });
            this.hasMany(model.Recent, { foreignKey: 'user_id'});
            this.hasMany(model.Recent, { foreignKey: 'recent_user_id',as:'recent_user'})
            this.hasMany(model.Comment, {
                foreignKey: 'user_id',
                as: 'comments',
            });
            this.hasMany(model.LikeComment, {
                foreignKey: 'user_id',
                as: 'likeComments',
            });
            this.hasMany(model.Story, { foreignKey: 'user_id' });
            this.hasMany(model.Follower, {
                foreignKey: 'follower_user_id',
                as: 'followers',
            });
            this.hasMany(model.Follower, {
                foreignKey: 'following_user_id',
                as: 'followings',
            });
        }
    }
    User.init(
        {
            full_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            gender: {
                type: DataTypes.STRING,
                validate: {
                    isIn: [['Female', 'Male', 'Other']],
                },
            },
            bio: {
                type: DataTypes.STRING,
                defaultValue: 'Welcome to Instagram',
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue:
                    'https://i.pinimg.com/564x/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg',
            },
            tick: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
