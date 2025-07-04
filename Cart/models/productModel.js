const mongoose = require('mongoose');

//1er cambio  agregado //  //
// Crea una conexión secundaria a product_db
const productDB = mongoose.createConnection(
  'mongodb+srv://pablopacheco:2oF5JwJHIOl1jdgc@cluster2025.jutof0c.mongodb.net/product_db?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
//

const productSchema =  new mongoose.Schema({
    name:{
        "type": "String",
         required: true
        },
    price: {
        "type": "Number"
    },
    description: {
        "type": "String"
    },
    category: {
        "type": "String"
    },
    image: {
        "type": "String"
    }
})

//module.exports = mongoose.model('Product', productSchema);
//2do cambio se comento arriba y se agrego esto de abajo
module.exports = productDB.model('Product', productSchema, 'products'); // 'products' es el nombre de la colección en MongoDB