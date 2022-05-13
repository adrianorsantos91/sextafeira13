const express = require('express')
const req = require('express/lib/request')

const products = require('./data/products')

const app = express()

app.use(express.json())

app.listen(3001, () => {
  console.log('Hello World')
})

app.get('/sextafeira13', (req, res) => {
  res.status(200).send('Hello Sexta-feira 13')
})

// ProductName

app.post('/sales', (req, res) => {
  const { productName, infos } = req.body

  const { saleDate } = infos

  // Verificação de Obrigatoriedade
  if (!productName) {
    return res
      .status(400)
      .json({ message: 'O campo productName é obrigatório' })
  }

  // Verificação de Tamanho minimo
  if (productName.length < 4) {
    return res
      .status(400)
      .json({ message: 'O campo productName deve ter pelo menos 4 caracteres' })
  }

  // Req 5
  if (!infos) {
    return res.status(400).json({ message: 'O campo infos é obrigatório' })
  }

  // Req 7
  if (!saleDate) {
    return res.status(400).json({ message: 'O campo saleDate é obrigatório' })
  }

  // Req 8
  const isSaleDateValid = validatedate(saleDate)

  if (!isSaleDateValid) {
    return res
      .status(400)
      .json({ message: 'O campo saleDate não é uma data válida' })
  }

  // products.push({ productName })

  return res.status(200).json({ message: 'Produto adicionado' })
})

// ==== Validação do formato da Data
// Req 6
function validatedate(inputText) {
  const dateformat =
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
  // Match the date format through regular expression
  if (inputText.value.match(dateformat)) {
    return true
  }

  return false
}

// Infos

// app.get('/sales', (req, res) => {
//   const { productName } = req.body

//   // Verificação de Obrigatoriedade
//   if (!productName) {
//     return res
//       .status(400)
//       .json({ message: 'O campo productName é obrigatório' })
//   }

//   // Verificação de Tamanho minimo
//   if (productName.length < 4) {
//     return res
//       .status(400)
//       .json({ message: 'O campo productName deve ter pelo menos 4 caracteres' })
//   }

//   // products.push({ productName })

//   return res.status(200).json({ message: 'Produto adicionado' })
// })
