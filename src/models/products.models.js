import mongoose from "mongoose";  

mongoose.pluralize(null)

const collection = 'users'

const schema = new mongoose.Schema({

    
first_name: { type: String, required: true },

last_name:{type: String, required: true},

email:{type: String, required: true},

gender:{type: String, required: true},

ip_address:{type: String, required: true}

})

const studentModel = mongoose.model(collection, schema)

export default studentModel