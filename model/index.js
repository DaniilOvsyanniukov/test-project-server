const { Product } = require('../db/productModel')

const productList = async (userId) => {
  const products = await Product.find({ userId })
  return products
}

const getProductId = async (productId) => {
  const product = await Product.find({ _id: productId })
  if (Object.keys(product).length === 0) { return undefined }
  return product
}

const removeProduct = async (productId) => {
  const product = await getProductId(productId)
  if (!product) { return undefined }
  await Product.findByIdAndRemove(productId)
  return product
}

const addProduct = async (body) => {
  console.log(body)
  const { imageUrl, name, count, size, weight, comments, userId } = body
  const products = new Product({ imageUrl, name, count, size, weight, comments, userId })
  await products.save()
  return body
}

const updateProduct = async (productId, body, Id) => {
  const product = await getProductId(productId, Id)
  if (!product) { return undefined }
  const { imageUrl, name, count, size, weight, comments, userId } = body
  await Product.findByIdAndUpdate(productId, { $set: { imageUrl, name, count, size, weight, comments, userId } })
  return body
}

module.exports = {
  productList,
  getProductId,
  removeProduct,
  addProduct,
  updateProduct,
}
