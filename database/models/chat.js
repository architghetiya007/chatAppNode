/* istanbul ignore file */
const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            require: false,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            require: false,
        },
        message: {
            type: String,
            required: false,
        }
    },
    {
        collection: 'Chats',
        timestamps: true,
    }
)

module.exports = mongoose.model('Chats', NotificationSchema)
