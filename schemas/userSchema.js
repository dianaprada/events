module.exports = {  
  type: 'object',
  required: ['username', 'password', 'name', 'lastname', 'country'],
  properties: {
    username: { type: 'string', pattern: "^[A-Za-z]*@gmail.com$"},
    password: { type: 'string' },
    name: { type: 'string' },
    lastname: { type: 'string' },
    country: { type: 'string' },
  }
}