const express = require('express')
const cors = require('cors')

require('dotenv').config()
const Note = require('./models/note')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const requestLogger = (request, response, next) => {
    console.log(next)
    console.log(request.body)
    next()
}

app.use(requestLogger)

app.get('/', (req, res) => {
    res.send('<h1> Welcome to my API. </h1>')
})

app.get('/api', (req, res) => {
    res.send('<h1> Welcome to my API. </h1>')
})

//res.json converts objects into JSON objects automatically

app.get('/api/notes', (req, res) => {
    console.log('getting all notes')
    Note.find({}).then(response => {
        console.log('JSON.stringify:', JSON.stringify(response))
        //res.json(response) === res.send(response.toJSON())

        /*
      response.map(note => note.toJSON) removes _id and __v and adds id to each note object
      this returns an array of JS objects

      res.json converts these returned objects into JSON data and returns them to the HTTP request
        */

        res.json(response.map(note => note.toJSON()))
    })
})

app.get('/api/notes/:id', (req, res, next) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note) {
                res.json(note.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(err => next(err))
})

app.put('/api/notes/:id', (req, res, next) => {
    const body = req.body

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(req.params.id, note, { new: true })
        .then(response => res.json(response.toJSON()))
        .catch(error => next(error))
})

app.delete('/api/notes/:id', (req, res, next) => {
    Note.findByIdAndDelete(req.params.id)
        .then(() => res.status(204).end())
        .catch(error => next(error))
})

// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id))
//     : 0
//   return maxId + 1
// }

/* You need to use express.json to access req.body*/

app.post('/api/notes', (req, res, next) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    const note = new Note({
        content: body.content,
        date: new Date(),
        important: body.important || false,
        //id: generateId()
    })
    note.save()
        .then(resp => {
            /* res.json(resp.toJSON()) sends the clean response to the Front-End to display to the user */
            res.json(resp.toJSON())
        })
        .catch(error => next(error))

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log('ERROR message:', error)

    if (error.name === 'CastError') return response.status(400).send({ error: 'malformatted id' })
    if (error.name === 'ValidationError') return response.status(400).send({ error: error.message })

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log('server running on port', PORT)
