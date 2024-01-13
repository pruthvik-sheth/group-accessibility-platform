const mongoose = require('mongoose')

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: process.env.MONGODB_DATABASE,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database connected successfully')
    } catch (err) {
        console.error('Failed to connect to Database')
        console.error(err)
    }
}

run()