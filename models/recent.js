'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Recent extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User }) {
            // define association here
            this.belongsTo(User, { foreignKey: 'user_id' });
            this.belongsTo(User, { foreignKey: 'recent_user_id',as:'recent_user' });
        }
    }
    Recent.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            recent_user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
        },
        {
            sequelize,
            modelName: 'Recent',
        }
    );
    return Recent;
};
