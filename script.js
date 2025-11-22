const productList = document.querySelector(".products")
const products = await getProducts()
const cart = {}

productList.onclick = handleCardClick

showProducts()

async function getProducts() {
  const response = await fetch("products.json")

  return response.json()
}

function showProducts() {
  const items = products.map(buildProductItem)

  productList.replaceChildren(...items)
}

function buildProductItem(product) {
  const item = document.createElement("li")
  const image = document.createElement("img")
  const title = document.createElement("h4")
  const row = document.createElement("div")
  const price = document.createElement("b")
  const button = document.createElement("button")
  
  image.src = "product-placeholder.jpg"
  title.append(product.title)
  price.append(product.price)
  button.append("add to cart")
  row.append(price, button)
  item.append(image, title, row)
  item.dataset.id = product.id
  
  return item
}

function handleCardClick(e) {
  const btn = e.target.closest("button")

  if (!btn) return
  
  const li = btn.closest("li")
  const id = li.dataset.id
  
  addToCart(id)
  renderCart()
}

function addToCart(id) {
  if (id in cart) {
    cart[id]++
  } else {
    cart[id] = 1
  }
}

function renderCart() {
  const cartList = document.querySelector(".cart>.products")
  const productsInCart = Object.entries(cart).flatMap(([id, count]) => {
    const product = products.find(p => p.id == id)

    if (!product) return []

    const clone = structuredClone(product)

    clone.count = count
    
    return clone
  })
  const items = productsInCart.map(buildCartItem)
  
  cartList.replaceChildren(...items)
}

function buildCartItem(product) {
  const item = document.createElement("li")
  const image = document.createElement("img")
  const title = document.createElement("h4")
  const price = document.createElement("b")
  const incrementButton = document.createElement("button")
  const decrementButton = document.createElement("button")
  const removeButton = document.createElement("button")
  const count = document.createElement("input")
  const total = document.createElement("output")

  title.append(product.title)
  item.append(title)
  
  return item
}