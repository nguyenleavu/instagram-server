'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Story extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User, StoryStatus }) {
            // define association here
            this.belongsTo(User, { foreignKey: 'user_id' });
            this.hasMany(StoryStatus, { foreignKey: 'story_id', as: 'isSeen' });
        }
    }
    Story.init(
        {
            story_file: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            user_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: 'Story',
        }
    );
    return Story;
};
