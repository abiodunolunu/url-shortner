import mongoose from 'mongoose'
const Schema = mongoose.Schema
const model = mongoose.model

const urlSchema = new Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {type: String, default: Date.now}
})

export default  model('Url', urlSchema)