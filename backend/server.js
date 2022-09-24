const { MongoClient, ServerApiVersion, ObjectID } = require('mongodb');
const uri = "mongodb+srv://dev:hCoYCjUTGFKEC2IK@boreal.vaa1q.mongodb.net/boreal_db?retryWrites=true&w=majority";

const express = require('express');
const cors = require('cors')
const app = express();

// use it before all route definitions
app.use(cors({origin: 'http://localhost:3000'}));
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

process.on("uncaughtException", function (err) {
  console.log(err);
});

/*
PROFILE (ALL)
*/

//SIGN UP, INPUT: full_name, email, password, account_Type (_id IS UNIQUE, USER )
//SIGN UP, OUTPUT: new user registered in the database
async function writeNewUserProfileToDb(uri_, user_info) {
  try {
    const client = await  MongoClient.connect(uri_, {
      useUnifiedTopology: true, serverApi: ServerApiVersion.v1
    });
    const db = client.db("boreal_db");
    var users_tb = db.collection("user_accounts_info");
    const response = await users_tb.insertOne(user_info);
    client.close();
    return response;
  } catch (error) {
    console.log(error);
    client.close();
  }
}

//EDIT PROFILE, INPUT: full_name, email, password, account_Type,(_id CANNOT BE MODIFIED)
//EDIT PROFILE, OUTPUT: updates user info in database
async function updateUserProfileToDb(uri_, user_info) {
  try {
    const client = await  MongoClient.connect(uri_, {
      useUnifiedTopology: true, serverApi: ServerApiVersion.v1
    });
    const db = client.db("boreal_db");
    var users_tb = db.collection("user_accounts_info");
    //This will retrieve the _id associated to the logged in user
    const response = await users_tb.updateOne({"_id": new ObjectID(user_info._id)},{
      $set: {
        "full_name": user_info.full_name,
        "email": user_info.email,
        "password": user_info.password,
        "home_address": user_info.home_address,
        "phone_number": user_info.phone_number,
        "gender": user_info.gender,
        "account_type": user_info.account_type
      }
    })
    client.close();
    return response;
  } catch(error) {
    client.close();
    console.log(error);
  }
}

//AUTHENTICATION, INPUT: email, password
//AUTHENTICATION, OUTPUT: logged in user (valid credential) OR error: wrong email or password (invalid credentials) 
async function validateUserProfileToDb(uri_, user_info) {
  try {
  const client = await  MongoClient.connect(uri_, {
    useUnifiedTopology: true, serverApi: ServerApiVersion.v1
  });
  const db = client.db("boreal_db");
  var users_tb = db.collection("user_accounts_info");
  const response = await users_tb.findOne({"email": user_info.email, "password": user_info.password},{
  })
  client.close();
  return response;
} catch(error) {
  client.close();
  console.log(error);
}
}

//SIGN UP 
app.post('/storeUserAccountInfo', function(req, res) {
  console.log(req.body);
  res.set({
    'Access-Control-Allow-Origin': '*'
  })
  writeNewUserProfileToDb(uri, req.body).then(response => {console.log(response); res.send(response)});
});

//EDIT PROFILE
app.post('/updateUserAccountInfo', function(req, res) {
  res.set({
    'Access-Control-Allow-Origin': '*'
  });
  updateUserProfileToDb(uri, req.body).then(response => {console.log(response); res.send(response)});
});

//AUTHENTICATION
app.post('/verifyUserAccountInfo', function(req, res) {
  res.set({
    'Access-Control-Allow-Origin': '*'
  })
  validateUserProfileToDb(uri, req.body).then(response => {console.log(response); res.send(response)});
});




/*
ORDERS (USER)
*/

//ADD ORDER, INPUT: customer_id, products_id:[Array], (_id IS UNIQUE, ORDER NUMBER)
//ADD ORDER, OUTPUT: order is added to database
async function writeOrderInDB(order) {
  if (order === undefined) return "Error. Order is not defined.";
  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  const db = client.db("boreal_db");
  var ordersCollection = db.collection("orders");
  let requestStatus = 10;
  try {
    requestStatus = await ordersCollection.insertOne(order);
  } catch (e) {
    client.close();
    return "Error in request to database. Make sure you sent a unique ID.";
  }
  client.close();
  return requestStatus;
}

//RETRIEVE MY ORDERS, INPUT: customer_id
//RETRIEVE MY ORDERS, OUTPUT: returns all orders associated to customer_id 
async function retrieveOrderInDb(uri_, user_info) {
  try {
  const client = await  MongoClient.connect(uri_, {
    useUnifiedTopology: true, serverApi: ServerApiVersion.v1
  });
  const db = client.db("boreal_db");
  var orders_tb = db.collection("orders");
  //retrieve all orders associated to customer_id
  const response = await orders_tb.find({"customer_id": user_info._id},{
  }).toArray();
  client.close();
  return response;
} catch(error) {
  client.close();
  console.log(error);
}
}

//DELETE ORDER, INPUT:  _id of Clients Order 
//DELETE PRODUCT, OUTPUT:  remove order associated to _id from database
async function deleteOrderInDb(uri_, order) {
  try {
    const client = await  MongoClient.connect(uri_, {
      useUnifiedTopology: true, serverApi: ServerApiVersion.v1
    });
    const db = client.db("boreal_db");
    var orders_tb = db.collection("orders");
    //This is used to retreive the _id in the database 
    const response = await orders_tb.deleteOne({"_id": new ObjectID(order._id)},{
    })
    client.close();
    return response;
  } catch(error) {
    client.close();
    console.log(error);
  }
}

//ADD ORDER
app.post("/sendOrder", (req, res) => {
  console.log("\n[API endpoint - send Order]\n\nOrder to add: ");
  console.log(req.body);
  res.set({ "Access-Control-Allow-Origin": "*" });
  writeOrderInDB(req.body).then((response) => {
    console.log("\nResponse is:");
    console.log(response);
    console.log();
    res.send(response);
  });
});

//RETRIEVE MY ORDERS
app.post("/retrieveOrder", (req, res) => {
  res.set({ "Access-Control-Allow-Origin": "*" });
  retrieveOrderInDb(uri, req.body).then((response) => {
    res.send(response);
  });
});

//DELETE MY ORDERS 
app.delete('/deleteOrder', function(req, res) {
  console.log(req.body);
  res.set({
    'Access-Control-Allow-Origin': '*'
  })
  deleteOrderInDb(uri, req.body).then(response => {console.log(response); res.send(response)});
});

/*
PRODUCTS (SELLER)
*/

//ADD PRODUCT, INPUT: _id, title, description, price, img, seller_id (_id IS UNIQUE; SKU)
//ADD PRODUCT, OUTPUT: product is added to database
async function writeNewSellerProductToDb(uri_, seller_info) {
  try {
    const client = await  MongoClient.connect(uri_, {
      useUnifiedTopology: true, serverApi: ServerApiVersion.v1
    });
    const db = client.db("boreal_db");
    var products_tb = db.collection("products");
    const response = await products_tb.insertOne(seller_info);
    client.close();
    return response;
  } catch (error) {
    console.log(error);
    client.close();
  }
}

//EDIT PRODUCT, INPUT: title, description, price, image, (seller_id CANNOT BE MODIFIED)
//EDIT PRODUCT, OUTPUT: updates product info in database
async function updateSellerProductToDb(uri_, seller_info) {
  try {
    const client = await  MongoClient.connect(uri_, {
      useUnifiedTopology: true, serverApi: ServerApiVersion.v1
    });
    const db = client.db("boreal_db");
    var products_tb = db.collection("products");
    //This will retrieve the _id(SKU) associated to the product
    const response = await products_tb.updateOne({"_id": seller_info._id},{
      $set: {
        //Seller is able to modify title, description, price and img ONLY. 
        "title": seller_info.title,
        "description": seller_info.description,
        "price": seller_info.price,
        "img": seller_info.img,
      }
    })
    client.close();
    return response;
  } catch(error) {
    client.close();
    console.log(error);
  }
}

//DELETE PRODUCT, INPUT: _id (SKU) of product
//DELETE PRODUCT, OUTPUT:  remove product associated to _id(SKU) from database
async function deleteProductInDb(uri_, seller_info) {
  try {
    const client = await  MongoClient.connect(uri_, {
      useUnifiedTopology: true, serverApi: ServerApiVersion.v1
    });
    const db = client.db("boreal_db");
    var products_tb = db.collection("products");
    const response = await products_tb.deleteOne({"_id": new ObjectID(seller_info._id)},{
    })
    client.close();
    return response;
  } catch(error) {
    client.close();
    console.log(error);
  }
}

//RETRIEVE MY PRODUCTS, INPUT: seller_id
//RETRIEVE MY PRODUCTS, OUTPUT: returns all products associated to seller_id 
async function retrieveProductsInDb(uri_, seller_info) {
  try {
  const client = await  MongoClient.connect(uri_, {
    useUnifiedTopology: true, serverApi: ServerApiVersion.v1
  });
  const db = client.db("boreal_db");
  var products_tb = db.collection("products");
  //retrieve all products associated to seller_id 
  const response = await products_tb.find({"seller_id": seller_info._id},{
  }).toArray();
  client.close();
  return response;
} catch(error) {
  client.close();
  console.log(error);
}
}

//RETRIEVE ORDERS, INPUT: seller_id
//RETRIEVE ORDERS, OUTPUT: returns all orders with products sold by seller
async function retrieveSellerOrders(uri_, seller_id) {
  try {
    const client = await MongoClient.connect(uri_, {
      useUnifiedTopology: true, serverApi: ServerApiVersion.v1
    });
    const db = client.db("boreal_db");
    const query = {"products": {
      $elemMatch: {"seller_id":seller_id}
    }};
    const response = await db.collection("orders").find(query).toArray();
    client.close();
    return response;
  } catch (error) {
    console.log(error);
    client.close();
  }
}

//ADD PRODUCT
app.post('/addProduct', function(req, res) {
  console.log(req.body);
  res.set({
    'Access-Control-Allow-Origin': '*'
  })
  writeNewSellerProductToDb(uri, req.body).then(response => {console.log(response); res.send(response)});
});

//EDIT PRODUCT 
app.post('/updateProduct', function(req, res) {
  res.set({
    'Access-Control-Allow-Origin': '*'
  });
  updateSellerProductToDb(uri, req.body).then(response => {console.log(response); res.send(response)});
});

//DELETE PRODUCT
app.delete('/deleteProduct', function(req, res) {
  console.log(req.body);
  res.set({
    'Access-Control-Allow-Origin': '*'
  })
  deleteProductInDb(uri, req.body).then(response => {console.log(response); res.send(response)});
});

//RETRIEVE MY PRODUCTS
app.post("/retrieveProducts", (req, res) => {
  res.set({ "Access-Control-Allow-Origin": "*" });
  retrieveProductsInDb(uri, req.body).then((response) => {
    res.send(response);
  });
});

// RETRIEVE SELLER ORDERS
app.get("/retrieveSellerOrders", (req, res) => {
  res.set({ "Access-Control-Allow-Origin": "*" });
  retrieveSellerOrders(uri, req.body.seller_id).then((response) => {
    res.send(response);
  })
})

/*
BROWSE ITEMS (CUSTOMER)
*/

//BROWSE ITEMS, INPUT: GET REQUEST
//BROWSE ITEMS, OUTPUT: returns all products in the database 
async function getProductsFromDatabase() {
  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  const db = client.db("boreal_db");
  var products_tb = db.collection("products");
  let allproducts = await products_tb.find().toArray();

  client.close();
  return allproducts;
}

//BROWSE ITEMS 
app.get("/getAllProducts", (req, res) => {
  res.set({ "Access-Control-Allow-Origin": "*" });

  getProductsFromDatabase().then((response) => {
    res.send(response);
  });
});

/*
GET USERS (ADMIN)
*/

//GET USERS, INPUT: GET REQUEST
//GET USERS, OUTPUT: returns all users in the database 
async function getUsersFromDatabase() {
  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  const db = client.db("boreal_db");
  var users_tb = db.collection("user_accounts_info");
  let allUsers = await users_tb.find().toArray();

  client.close();
  return allUsers;
}

//GET USERS
app.get("/getAllUsers", (req, res) => {
  res.set({ "Access-Control-Allow-Origin": "*" });

  getUsersFromDatabase().then((response) => {
    res.send(response);
  });
});

//DELETE USER, INPUT: _id
//DELETE USER, OUTPUT:  remove user associated to _id from database
async function deleteUsersFromDatabase(uri_, user) {
  try {
    const client = await  MongoClient.connect(uri_, {
      useUnifiedTopology: true, serverApi: ServerApiVersion.v1
    });
    const db = client.db("boreal_db");
    var users_tb = db.collection("user_accounts_info");
    const response = await users_tb.deleteOne({"_id": new ObjectID(user._id)},{
    })
    client.close();
    return response;
  } catch(error) {
    client.close();
    console.log(error);
  }
}
//DELETE USER
app.delete('/deleteUser', function(req, res) {
  console.log(req.body);
  res.set({
    'Access-Control-Allow-Origin': '*'
  })
  deleteUsersFromDatabase(uri, req.body).then(response => {console.log(response); res.send(response)});
});

app.listen(3001, () => console.log('Listening on port 3001...'));