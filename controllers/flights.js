import { Flight } from "../models/flight.js"


function newFlight(req, res) {
    res.render('flights/new', {
        title: 'Add Flight'
    })
}

async function create(req, res) {
    try {
       const flights = await Flight.create(req.body)
       console.log('/flights')
       res.redirect('/flights')
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
      const flight = await Flight.findById(req.params.flightId)
      // render a view
      res.render('flights/show', {
        flight,
        title: 'Flight Detail'
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
      const flight = await Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
      // redirect to 
      res.redirect(`/flights/${req.params.todoId}`)
    } catch (error) {
      console.log(error)
      res.redirect(`/flights/${req.params.todoId}`)
    }
  }

export {
    index,
    newFlight as new,
    create,
    show,
    edit,
    deleteFlight as delete,
    update
}