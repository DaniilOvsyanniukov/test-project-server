const express = require('express')
const router = express.Router()
const Joi = require('joi')

const schema = Joi.object(
  {
    imageUrl: Joi.string(),
    name: Joi.string().min(3).max(30).required().regex(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/),
    count: Joi.number().required(),
    size: {
      width: Joi.number().required(),
      height: Joi.number().required(),
    },
    weight: Joi.string().required(),
    comments: Joi.string(),
    userId: Joi.string(),
  })

const {
  productList,
  removeProduct,
  addProduct,
  updateProduct,
} = require('../../model/index')

router.get('/', async (req, res, next) => {
  try {
    const { id } = req.query
    console.log(id)
    const products = await productList(id)
    console.log(products)
    res.status(200)
    res.json(products)
  } catch (error) {
    res.json({ message: 'You did not create a product' })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { imageUrl, name, count, size, weight, comments, userId } = await schema.validateAsync(req.body)
    const newProduct = { imageUrl, name, count, size, weight, comments, userId }
    await addProduct(newProduct)
    const products = await productList(userId)
    res.status(201)
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(400)
    res.json({ message: error.message })
  }
})

router.delete('/:productId', async (req, res, next) => {
  const productId = req.params.productId
  const product = await removeProduct(productId)
  if (product === void 0) {
    res.status(404)
    res.json({ message: 'Not found' })
  }
  const products = await productList(product.pop().userId)
  res.status(200)
  res.json(products)
})

router.put('/:productId', async (req, res, next) => {
  try {
    const body = await schema.validateAsync(req.body)
    const updatedProduct = await updateProduct(req.params.productId, body)
    if (!updatedProduct) { res.json({ message: 'Not found' }) }
    const products = await productList(body.userId)
    res.status(200)
    res.json(products)
  } catch (error) {
    res.status(400)
    res.json({ message: error.message })
  }
})

module.exports = router
