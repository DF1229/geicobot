const { DataTypes, Model } = require('sequelize');

module.exports = class Servers extends Model {
    static init(sequelize) {
        return super.init({
            guildID: {
                type: DataTypes.DOUBLE,
                unique: true
            },
            guildName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            memberCount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            prefix: {
                type: DataTypes.STRING,
                defaultValue: '>',
                allowNull: false
            },
            economyEnabled: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }
        }, {
            tableName: 'Server',
            timestamps: true,
            sequelize
        });
    }
}