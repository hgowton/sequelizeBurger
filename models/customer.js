//Creating a Customer table linked to the burger table
//customer is the parent of burger_name
module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
        name: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    });

    Customer.associate = function(models) {
        //Associates customer with burger
        //When a customer is deleted, also delete any associated burger orders
        Customer.hasMany(models.Burgers, {
            onDelete: "cascade"
        });
    };
    return Customer;
};