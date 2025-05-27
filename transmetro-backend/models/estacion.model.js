module.exports = (sequelize, DataTypes) => {
  const Estacion = sequelize.define('Estacion', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ubicacion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    EmpleadoId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    MunicipalidadId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'estaciones',
    timestamps: false
  });

  Estacion.associate = (models) => {
    console.log('>>> Asociando modelo Estacion');
    
    Estacion.belongsTo(models.Municipalidad, {
      foreignKey: 'MunicipalidadId',
      as: 'Municipalidad'
    });

    Estacion.belongsTo(models.Empleado, {
      foreignKey: 'EmpleadoId',
      as: 'Empleado' // ✅ alias único para evitar conflicto con Bus
    });
  };

  return Estacion;
};
