const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI // Set database name in URL

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to MongoDB'))
    .catch((error) => console.log('error connecting to MongoDB:', error.message))

/* Defining what elements in collection should include */
const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        minlength: 5,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    important: Boolean,
})

/*
We want to get rid of _id and __v fields and replace _id with id
toJSON is equivalent to JSON.stringify()

When toJSON is called on the note, it removes _id and __v and adds id
this will not happen if toJSON is not called on the note object

toJSON converts arrays into JSON objects. These are different in the sense that JSON objects
need to have keys which are in double quotes!

the express middleware express.json(data) is equivalent to express.send(JSON.stringify(data))
*/

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema) // Collection made from Schema. It will be called 'notes'