module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define('Rol', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'roles', // ✅ fuerza a usar tu tabla real en minúsculas
    timestamps: false
  });

  Rol.associate = (models) => {
    Rol.hasMany(models.Empleado, { foreignKey: 'rol_id' });
  };

  return Rol;
};