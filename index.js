//to be able to use express module
const express = require("express")

//load in cars "api"
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
    const id = parseInt(req.params.id)

    //find the car we want to update
    const car = cars.find(c => c.id === id)

    //update its properties
    car.make = req.body.make
    car.model = req.body.model

    res.send(car)
})

app.delete("/cars/:id", (req, res) => {
    const id = parseInt(req.params.id)

    //need the index to remove right car
    const i = cars.findIndex(c => c.id === id)

    cars.splice(i, 1)

    res.send(cars)
})

// at the bottom
app.listen(8080, ()=> {
    console.log("http://localhost:8080")
})