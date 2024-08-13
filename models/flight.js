import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const mealSchema = ({
  name: String
})

const ticketSchema = new Schema({
    seat: {
      type: String,
      match: /[A-F][1-9]\d?/
    },
    price: {
        type: Number,
        min: 0
    }
  }, {
    timestamps: true
  })

const flightSchema = new Schema ({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United']
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999,
    },
    tickets: [ticketSchema],
    departs: {
      type: Date,
      default: Date.now,
      get: (date)=> 
        date.toLocaleString(),
    }
    }, {    
        timestamps: true
})

// Compile the schema into a model and export it
const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}

