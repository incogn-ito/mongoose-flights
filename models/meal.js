import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const mealSchema = new Schema({
    name: {
      type: String,
      required: true
    }
}, {    
    timestamps: true
})

// Compile the schema into a model and export it
const Meal = mongoose.model('Meal', mealSchema)

export {
  Meal
}

