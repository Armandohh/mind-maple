module.exports = (sequelize, DataTypes) => {
    const Decks = sequelize.define("Decks", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Decks;
}