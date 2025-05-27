module.exports = (sequelize, DataTypes) => {
  const Bus = sequelize.define('Bus', {
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    LineaId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ParqueoId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EmpleadoId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    tableName: 'buses',
    timestamps: false // ✅ Para evitar createdAt/updatedAt en reportes si no los usas
  });

  Bus.associate = (models) => {
    console.log('>>> Asociando modelo Bus');

    Bus.belongsTo(models.Linea, {
      foreignKey: 'LineaId',
      as: 'Linea'
    });

    Bus.belongsTo(models.Parqueo, {
      foreignKey: 'ParqueoId',
      as: 'Parqueo'
    });

    Bus.belongsTo(models.Empleado, {
      foreignKey: 'EmpleadoId',
      as: 'Conductor' // ✅ Alias único y descriptivo
    });
  };

  return Bus;
};