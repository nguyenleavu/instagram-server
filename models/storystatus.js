'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StoryStatus extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User, Story }) {
            // define association here
            this.belongsTo(User, { foreignKey: 'user_id' });
            this.belongsTo(Story, { foreignKey: 'story_id'});
        }
    }
    StoryStatus.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            story_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
        },
        {
            sequelize,
            modelName: 'StoryStatus',
        }
    );
    return StoryStatus;
};
