export default (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    date: {
      type: DataTypes.DATEONLY
    },
    mealId: {
      type: DataTypes.INTEGER
    }
  }, {});
  Menu.associate = (models) => {
    Menu.belongsTo(models.Meal, {
      foreignKey: 'mealId'
    });
    // associations can be defined here
  };
  return Menu;
};
