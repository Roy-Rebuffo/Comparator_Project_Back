const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  
    // Trim: elimina los espacios al principio y final
    {
        name: {
            type: String,
            required: true,
            trim: true,
          },
          description: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
            min: 0,
          },
          category: {
            type: String,
            required: true,
          },
          picture: {
            type: String,
          },
    },
    // Timestamps: fecha de creación - modificación
    {
        timestamps: true
    }
);


const Product = mongoose.model('products', productSchema);

module.exports = Product;