/* istanbul ignore file */
const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        collection: 'Users',
        timestamps: true
    }
)

module.exports = mongoose.model('Users', UserSchema)
