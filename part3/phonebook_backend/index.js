const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('post', (req, res) => {
    if (req.method == 'POST'){
        return JSON.stringify(req.body)
    }
    return 'null';
})

const app = express()

app.use(express.json())
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :post'
    )
)
app.use(cors())


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

let numbers = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(numbers)
  })

app.get('/info', (request, response) => {
    const people = numbers.length
    const date = new Date()
    const days = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat']
    const months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
    console.log(date.getFullYear())
    response.send(`<p> Phonebook has info for ${people} people
    <p> ${days[date.getDay()]} ${months[date.getMonth()]} 
    ${date.getDate()} ${date.getFullYear()} 
    ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
    GMT+0${date.getTimezoneOffset()} (Eastern Standard Time)</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const num = numbers.find(num => num.id === id)
    if (num) {
        response.json(num)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    numbers = numbers.filter(num => num.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const names = numbers.filter(num => num.name === body.name)
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'missing name or number'
        })
    }

    if (names.length!=0) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const num = {
        id: Math.random(1000),
        name: body.name,
        number: body.number,
    }

    numbers = numbers.concat(num)
    response.json(num)
})