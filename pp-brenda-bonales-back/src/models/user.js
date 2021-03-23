const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: { type: String, required: true},
        email: { type: String, required: true},
        phone: { type: Number, required: true},
        password: { type: String, required: true},
        age: { type: Number, required: true},
        gender: { type: String, required: true},
        hobby: { type: String, required: true},
        date: { type: Date, default: Date.now}
    },
    {
      timestamps: true,
    }
);

module.exports = model('User', userSchema, 'users');