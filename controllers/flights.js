import { Flight } from "../models/flight.js"
import { Meal } from "../models/meal.js"



function newFlight(req, res) {
    res.render('flights/new', {
        title: 'Add Flight'
    })
}

async function create(req, res) {
    try {
       const flights = await Flight.create(req.body)
       console.log('/flights')
       res.redirect(`/flights/${flight._id}`)
    } catch (error) {
        console.log(error)
        res.redirect('/flights/new')
    }
}

async function index(req, res) {
    try {
      //look up things
      const flights = await Flight.find({})
  
      res.render('flights/index', {
          flights,  
          title: 'All Flights'
      }) 
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  }

async function show(req, res) {
    try {
      const flight = await Flight.findById(req.params.flightId).populate('meal')
      const meals = await Meal.find({_id: {$nin: flight.meal}})
      // render a view
      res.render('flights/show', {
        flight,
        title: 'Flight Detail',
        meals
      })
    } catch (error) {
      console.log(error)
      res.redirect('/flights')
    }
  }

  async function deleteFlight(req, res) {
    try {
      await Flight.findByIdAndDelete(req.params.flightId)
      res.redirect('/flights')
    } catch (error) {
      console.log(error)
      res.redirect('/flights')
    }
  }
  
  async function edit(req, res) {
    try {
      const flight = await Flight.findById(req.params.flightId)
      res.render('flights/edit', {
        flight,
        title: 'Edit Flight'
      })
    } catch (error) {
      console.log(error)
      res.redirect('/flights')
    }
  }

  async function update(req, res) {
    try {
      // find the flight and update it
      await Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
      // redirect to 
      res.redirect(`/flights/${req.params.flightId}`)
    } catch (error) {
      console.log(error)
      res.redirect(`/flights/${req.params.flightId}`)
    }
  }

  async function createTicket(req, res) {
    try {
      const flight = await Flight.findById(req.params.flightId)
      flight.tickets.push(req.body)
      await flight.save()
      res.redirect(`/flights/${flight._id}`)
    } catch (error) {
      console.log(error)
      res.redirect(`/flights/${req.params.flightId}`)
    }
  }

export {
    index,
    newFlight as new,
    create,
    show,
    edit,
    deleteFlight as delete,
    update,
    createTicket
}