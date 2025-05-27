module.exports = (sequelize, DataTypes) => {
  const Empleado = sequelize.define('Empleado', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    correo: {
      type: DataTypes.STRING,
      unique: true
    },
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING,
    historial_educativo: DataTypes.TEXT,
    rol_id: DataTypes.INTEGER,
    password: DataTypes.TEXT
  }, {
    tableName: 'empleados',
    timestamps: false
  });

  Empleado.associate = (models) => {
    console.log('>>> Asociando modelo Empleado');

    Empleado.belongsTo(models.Rol, {
      foreignKey: 'rol_id',
      as: 'Rol' 
    });

    Empleado.hasMany(models.Bus, {
      foreignKey: 'EmpleadoId',
      as: 'Buses'
    });

    Empleado.hasMany(models.Estacion, {
      foreignKey: 'EmpleadoId',
      as: 'Estaciones'
    });
  };

  return Empleado;
};
