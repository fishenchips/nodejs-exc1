const express = require("express")

const cars = require("./cars.js")

// get a new id from array
function getId() {
    // get last item in the array
    const lastCar = cars.slice(-1)[0]

    let id = (lastCar?.id);
    id = id 
        ? id + 1
        : id

    return id
}

//initiating express
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Cars")
})

// hämta many cars
app.get("/cars", (req, res) =>{
    res.send(cars)
})

// "hämta" one car // cars/1
app.get("/cars/:id", (req, res) => {
    const id = parseInt(req.params.id)

    const car = cars.find(c => c.id === id)

    res.send(car)
})

//Create new car
app.post("/cars", (req, res) => {
    const id = getId()

    const newCar = {
        id,
        make: req.body.make,
        model: req.body.model
    }

    cars.push(newCar)

    res.send({id})
})

app.put("/cars/:id", (req, res) => {
    //TODO: Update a car
})

app.delete("/cars/:id", (req, res) => {
    //TODO: Delete a car
})

app.listen(8000, ()=> {
    console.log("http://localhost:8000")
})