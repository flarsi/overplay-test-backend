const {Schema, model, Types} = require('mongoose');
const bcrypt = require("bcrypt");

const usersShema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  versionKey: false
}
);

usersShema.pre(
  'save',
  async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
);

module.exports = model('Users', usersShema);