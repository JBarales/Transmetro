module.exports = (sequelize, DataTypes) => {
  const Municipalidad = sequelize.define('Municipalidad', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'municipalidades',
    timestamps: false
  });

  Municipalidad.associate = (models) => {
    console.log('>>> Asociando modelo Municipalidad');

    Municipalidad.hasMany(models.Estacion, {
      foreignKey: 'MunicipalidadId',
      as: 'Estaciones'
    });
  };

  return Municipalidad;
};
