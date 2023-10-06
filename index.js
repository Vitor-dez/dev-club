const express = require('express')
const app = express()
const uuid = require('uuid')
const port = 3000
app.use(express.json())


const users = []


// Mideelws ---------------------------------------------------------
const checkUserid = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(400).json({ erro: 'user Not found' })
    }
    request.userIndex = index

    request.userId  = id

    next()
}
// Mideelws ----end---------------------------------------------------



// rout return Ulpdate users--------------
app.get('/users', (request, response) => {
    return response.json(users)
})
// rout return Ulpdate users--------------




// rout creat user --------------------------------
app.post('/users', (request, response) => {

    const { name, age } = request.body

    const creatUser = { id: uuid.v4(), name, age }

    users.push(creatUser)

    return response.json(users)
})
// rout creat user ---------------------------------





// rout Ulpdate -------------------------------------------
app.put('/users/:id', checkUserid, (request, response) => {

    const { name, age } = request.body

    const index = request.userIndex
const id = request.userId
    const founUser = { id, name, age }

    users[index] = founUser

    return response.status(201).json(founUser)
})
// rout Ulpdate -------------------------------------------





//Rout and Delete users --------------------------------
app.delete('/users/:id', (request, response) => {

    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json(users)
})
//Rout and Delete users ---------------------------------




app.listen(port, () => {
    console.log(`🚀 Server estarted on port ${port}`)
})
