module.exports = (sequelize, DataTypes) => {
  const Linea = sequelize.define('Linea', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    distancia_total: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'lineas',
    timestamps: false
  });

  Linea.associate = (models) => {
    console.log('>>> Asociando modelo Linea');

    Linea.hasMany(models.Bus, {
      foreignKey: 'LineaId',
      as: 'Buses'
    });
  };

  return Linea;
};
