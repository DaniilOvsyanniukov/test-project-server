const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, 'Set name'],
  },
  name: {
    type: String,
    required: [true, 'Set name'],
  },
  count: {
    type: Number,
    required: [true, 'Set count'],
  },
  size: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    type: Object,
    required: [true, 'Set size'],
  },
  weight: {
    type: String,
    required: [true, 'Set weight'],
  },
  comments: {
    type: String,
  },
  userId: {
    type: String,
    required: [true, 'Set id'],
  }

})
const Product = mongoose.model('products', productSchema)
module.exports = { Product }
