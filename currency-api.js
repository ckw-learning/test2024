const currency = [
  {
    "id": "USD",
    "name": "United States Dollar",
    "symbol": "$",
    "rate": 1.0,
    "description": "The primary currency of the United States and many other countries."
  },
  {
    "id": "EUR",
    "name": "Euro",
    "symbol": "€",
    "rate": 0.85,
    "description":"The official currency of many European countries."
  }
]

const getCurrency = (id) => {
  return currency.find(c => c.id === id)
}

const addCurrency = (id, name, symbol, rate, description) => {
  currency.push({
    id,
    name,
    symbol,
    rate,
    description
  })
}

console.log(getCurrency("USD"))

module.exports = {
  getCurrency,
  addCurrency
}