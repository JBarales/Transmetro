const bcrypt = require('bcrypt');

const password = 'casa123'; // esta es tu contraseña deseada
bcrypt.hash(password, 10).then(hash => {
  console.log('HASH:', hash);
});
