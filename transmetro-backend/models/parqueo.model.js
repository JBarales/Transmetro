module.exports = (sequelize, DataTypes) => {
  const Parqueo = sequelize.define('Parqueo', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'parqueos',
    timestamps: false
  });

  Parqueo.associate = (models) => {
    console.log('>>> Asociando modelo Parqueo');

    Parqueo.hasMany(models.Bus, {
      foreignKey: 'ParqueoId',
      as: 'Buses'
    });
  };

  return Parqueo;
};
