const Schema = mongoose.Schema

const flightsSchema = new Schema ({
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
        require: true,
        min: 10,
        max: 9999,
    },
    departs: Date
})