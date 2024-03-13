const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Product = require('./api/models/products.model');

const arrayProducts = [
  {
    name: "Camiseta negra Stark",
    description: "Camiseta de algodón con el logo de la casa Stark",
    price: 20,
    picture: "",
    category:"Camiseta"
    
  },
  {
    name: "Camiseta negra Lannister",
    description: "Camiseta de algodón con el logo de la casa Lannister.",
    price: 20,
    picture:"",
    category:"Camiseta"
  },
  {
    name: "Camiseta negra Targaryen",
    description: "Camiseta de algodón con el logo de la casa Targaryen.",
    price: 20,
    picture: "",
    category:"Camiseta"
  },
  {
    name: "Bolsa negra Stark",
    description: "Camiseta de algodón con el logo de la casa Stark",
    price: 20,
    picture: "",
    category:"Bolsa"
    
  },
  {
    name: "Bolsa negra Lannister",
    description: "Camiseta de algodón con el logo de la casa Lannister.",
    price: 20,
    picture:"",
    category:"Bolsa"
  },
  {
    name: "Bolsa negra Targaryen",
    description: "Camiseta de algodón con el logo de la casa Targaryen.",
    price: 20,
    picture: "",
    category:"Bolsa"
  },
];

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allProducts = await Product.find();
    if (allProducts.length > 0) {
      await Product.collection.drop();
      console.log('Productos borrados');
    }
  })
  .catch((err) => {
    console.log('error borrando los prodcutos', err);
  })
  .then(async () => {
    const productMap = arrayProducts.map((product) => new Product(product));
    await Product.insertMany(productMap);
    console.log('productos insertados');
  })
  .catch((err) => {
    console.log('error insertando los productos', err);
  })
  .finally(() => mongoose.disconnect());
