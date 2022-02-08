const bcrypt = require('bcrypt')

admin = {
    name: 'admin',
    email: 'admin@gmail.com',
    phone: '12345',
    password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10),
    isAdmin: true
}

module.exports = admin