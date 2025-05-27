const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Empleado = require('./empleado.model')(sequelize, Sequelize);
db.Municipalidad = require('./municipalidad.model')(sequelize, Sequelize);
db.Estacion = require('./estacion.model')(sequelize, Sequelize);
db.Linea = require('./linea.model')(sequelize, Sequelize);
db.Bus = require('./bus.model')(sequelize, Sequelize);
db.Parqueo = require('./parqueo.model')(sequelize, Sequelize);
db.Rol = require('./rol.model')(sequelize, Sequelize);

/* Relaciones
// Asociación con municipios
db.Municipalidad.hasMany(db.Estacion);
db.Estacion.belongsTo(db.Municipalidad);

// Asociación con líneas
db.Linea.hasMany(db.Bus);
db.Bus.belongsTo(db.Linea);

// Asociación con parqueos
db.Parqueo.hasMany(db.Bus);
db.Bus.belongsTo(db.Parqueo);

// Relación: conductor (empleado) asignado a un bus
db.Empleado.hasOne(db.Bus, { foreignKey: 'EmpleadoId' });
db.Bus.belongsTo(db.Empleado, { foreignKey: 'EmpleadoId' });

// Relación: policía (empleado) asignado a una estación
db.Empleado.hasOne(db.Estacion, { foreignKey: 'EmpleadoId' });
db.Estacion.belongsTo(db.Empleado, { foreignKey: 'EmpleadoId' });


db.Rol.hasMany(db.Empleado, { foreignKey: 'rol_id' });
db.Empleado.belongsTo(db.Rol, { foreignKey: 'rol_id' });
*/
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;