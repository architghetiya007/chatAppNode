const mongoose = require('mongoose')
;(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/chat')
        console.log('mongodb is connected successfully');
    } catch (err) {
        console.log('mongodb is disconnected', err);
    }
})()