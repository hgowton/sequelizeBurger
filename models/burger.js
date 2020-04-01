//Creates a Burgers table with columns for burger_name and devoured
//Based on Week 15 Sequelize -- Activity 14 -- models -- post.js
module.exports = function(sequelize, DataTypes) {
    var Burgers = sequelize.define("Burgers", {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
    
    Burgers.associate = function(models) {
        //The burger belongs to a customer
        //A burger can't be created without a customer due to the foreign key constraint
        Burgers.belongsTo(models.Customer, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    
    return Burgers;
};