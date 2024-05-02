const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser'); // Import body-parser

const fs = require('fs');

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, 'uploads');
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('image'); // Field name is 'image'

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MySQL database configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sf_eng'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

// API endpoint to handle smartphone registration
app.post('/api/insert_smartphone', (req, res) => {
  upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
          console.log('Multer error:', err);
          return res.status(500).json({ error: 'Error uploading file' });
      } else if (err) {
          console.log('Unknown error:', err);
          return res.status(500).json({ error: 'Unknown error' });
      }

      const { product, pdt_name, current_price, initial_price, storage_capacity, ram,
          display_description, resolution, refresh_rate, camera_setup, processor,
          battery_life, operating_system, biometric_security, water_resistance,
          fast_charging_support, wireless_charging_support, connectivity_options,
          color_options, dimensions } = req.body;

      // Check if req.body is undefined or if any required field is missing
      if (!product || !pdt_name || !current_price || !initial_price || !storage_capacity || !ram ||
          !display_description || !resolution || !refresh_rate || !camera_setup || !processor ||
          !battery_life || !operating_system || !biometric_security || !water_resistance ||
          !fast_charging_support || !wireless_charging_support || !connectivity_options ||
          !color_options || !dimensions) {
          return res.status(400).json({ error: 'Missing required fields in request body' });
      }

      const imagePath = req.file.path;

      // Insert data into MySQL database
      const sql = 'INSERT INTO smartphones (product, pdt_name, current_price, initial_price, storage_capacity, ram, ' +
          'display_description, resolution, refresh_rate, camera_setup, processor, battery_life, operating_system, ' +
          'biometric_security, water_resistance, fast_charging_support, wireless_charging_support, connectivity_options, ' +
          'color_options, dimensions, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      connection.query(sql, [product, pdt_name, current_price, initial_price, storage_capacity, ram,
          display_description, resolution, refresh_rate, camera_setup, processor,
          battery_life, operating_system, biometric_security, water_resistance,
          fast_charging_support, wireless_charging_support, connectivity_options,
          color_options, dimensions, imagePath], (err, result) => {
              if (err) {
                  console.error('Error inserting data into database:', err);
                  res.status(500).json({ error: 'Failed to register smartphone' });
              } else {
                  console.log('Smartphone registered successfully');
                  res.status(200).json({ message: 'Smartphone registered successfully' });
              }
          });

      // Delete the uploaded image after storing in the database (optional)
      // fs.unlinkSync(imagePath);
  });
});

// API endpoint to fetch product details based on product name
app.get('/api/product-details', (req, res) => {
  const productName = req.query.name;

  // Check if productName is provided in the query parameter
  if (!productName) {
      return res.status(400).json({ error: 'Product name is required' });
  }

  // Query the database to fetch product details based on the product name
  const sql = 'SELECT * FROM smartphones WHERE pdt_name = ?';
  connection.query(sql, [productName], (err, result) => {
      if (err) {
          console.error('Error fetching product details:', err);
          return res.status(500).json({ error: 'Failed to fetch product details' });
      }

      // Check if result is not empty
      if (result.length > 0) {
          const productDetails = {
              pdt_name: result[0].pdt_name,
              current_price: result[0].current_price,
              initial_price: result[0].initial_price,
              storage_capacity: result[0].storage_capacity,
              ram: result[0].ram,
              display_description: result[0].display_description,
              resolution: result[0].resolution,
              refresh_rate: result[0].refresh_rate,
              camera_setup: result[0].camera_setup,
              processor: result[0].processor,
              battery_life: result[0].battery_life,
              operating_system: result[0].operating_system,
              biometric_security: result[0].biometric_security,
              water_resistance: result[0].water_resistance,
              fast_charging_support: result[0].fast_charging_support,
              wireless_charging_support: result[0].wireless_charging_support,
              connectivity_options: result[0].connectivity_options,
              color_options: result[0].color_options,
              dimensions: result[0].dimensions,
              image: result[0].image_path
          };
          res.status(200).json(productDetails);
      } else {
          res.status(404).json({ error: 'Product not found' });
      }
  });
});


// Modify the route to accept product type as a query parameter
// Modify the route to accept product type as a query parameter
app.get('/api/products', (req, res) => {
  const productType = req.query.type; // Extract product type from query params
  
  // Construct the SQL query dynamically based on the product type
  let sql;
  if (productType === 'smartphones' || productType === 'laptops' || productType === 'accessories') {
      sql = `SELECT * FROM smartphones where product = "${productType}" ORDER BY id DESC LIMIT 10`; 
      
      // Assuming 'product' is the column storing product type
  } else {
      // If an invalid product type is provided
      return res.status(400).json({ error: 'Invalid product type' });
  }

  // Execute the SQL query
  connection.query(sql, (err, results) => {
      if (err) {
          console.error('Error fetching products:', err);
          res.status(500).json({ error: 'Failed to fetch products' });
      } else {
          res.json(results);
          console.log('Fetched successfully');
      }
  });
});


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Define API endpoint for creating password
app.post('/api/create_password', (req, res) => {
  const { email, password } = req.body;

  // Insert hashed password into MySQL database
  const sql = `INSERT INTO passwords (email, password) VALUES (?, ?)`;
  connection.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('Error inserting password into database: ', err);
      res.status(500).json({ error: 'Error creating password' });
      return;
    }
    console.log('Password created successfully');
    res.status(200).json({ message: 'Password created successfully' });
  });
});

// Define API endpoint for login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Check if email and password match in the database
  const sql = `SELECT * FROM passwords WHERE email = ? AND password = ?`;
  connection.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Error processing login' });
      return;
    }

    if (result.length === 1) {
      console.log('Login successful');
      // Here, you might want to check if the user is an admin or a regular user.
      // Assuming you have an 'isAdmin' field in the passwords table.
      const isAdmin = result[0].isAdmin; // Check if the user is an admin
      res.status(200).json({ message: 'Login successful', isAdmin: isAdmin });
    } else {
      console.log('Invalid email or password');
      res.status(401).json({ error: 'Invalid email or password' });
    }
  });
});

// Define API endpoint for registering a new user
app.post('/api/register', (req, res) => {
  const { email, name, phone, dob, gender, pincode, country, state, district, address } = req.body;

  // Insert data into MySQL database
  const sql = `INSERT INTO users (email, name, phone, dob, gender, pincode, country, state, district, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(sql, [email, name, phone, dob, gender, pincode, country, state, district, address], (err, result) => {
    if (err) {
      console.error('Error inserting data into database: ', err);
      res.status(500).json({ error: 'Error processing registration' });
      return;
    }
    console.log('Registration successful');
    // If registration is successful, proceed to create a password for the user.
    // You can redirect the user to a page where they can set their password.
    res.status(200).json({ message: 'Registration successful' });
  });
});

// Define API endpoint for updating profile data
app.post('/api/update_profile', (req, res) => {
  const updatedProfileData = req.body;

  // Update profile data in the database
  const sql = `UPDATE users SET name=?, phone=?, dob=?, gender=?, pincode=?, country=?, state=?, district=?, address=? WHERE email=?`;
  const values = [
    updatedProfileData.name,
    updatedProfileData.phone,
    updatedProfileData.dob,
    updatedProfileData.gender,
    updatedProfileData.pincode,
    updatedProfileData.country,
    updatedProfileData.state,
    updatedProfileData.district,
    updatedProfileData.address,
    updatedProfileData.email
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating profile data:', err);
      res.status(500).json({ error: 'Error updating profile data' });
      return;
    }

    console.log('Profile updated successfully');
    res.status(200).json({ message: 'Profile updated successfully' });
  });
});



// Route to handle form submission
app.post('/api/insert_predictions', (req, res) => {
  const { pdtName, storage, ram, pdtDatesPrices } = req.body;

  // Insert data into MySQL database
  const sql = 'INSERT INTO predictions (pdtName, storage, ram, pdtDatesPrices) VALUES (?, ?, ?, ?)';
  connection.query(sql, [pdtName, storage, ram, pdtDatesPrices], (err, result) => {
      if (err) {
          console.error('Error inserting data into MySQL:', err);
          res.status(500).send('Failed to insert predictions.');
          return;
      }
      console.log('Predictions inserted successfully.');
      res.status(200).send('Predictions inserted successfully.');
  });
});



// Route to fetch predictions data
app.get('/api/get_predictions', (req, res) => {
  // Query to fetch predictions data from MySQL database
  const sql = 'SELECT * FROM predictions';

  // Execute the query
  connection.query(sql, (err, results) => {
      if (err) {
          console.error('Error fetching predictions data:', err);
          res.status(500).json({ error: 'Failed to fetch predictions data.' });
          return;
      }
      
      // If data is fetched successfully, send it back as JSON response
      res.status(200).json(results);
  });
});




// API endpoint to fetch products
app.get('/api/viewsmartphone', (req, res) => {

      const sql = `SELECT * FROM smartphones where product ='smartphones' ORDER BY id DESC;
      `;


  // Execute the SQL query
  connection.query(sql, (err, results) => {
      if (err) {
          console.error('Error fetching products:', err);
          res.status(500).json({ error: 'Failed to fetch products' });
      } else {
          res.json(results);
          console.log('Products fetched successfully');
      }
  });
});

app.get('/api/viewaccessories', (req, res) => {

  const sql = `SELECT * FROM smartphones where product ='accessories' ORDER BY id DESC;
  `;


// Execute the SQL query
connection.query(sql, (err, results) => {
  if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Failed to fetch products' });
  } else {
      res.json(results);
      console.log('Products fetched successfully');
  }
});
});


app.get('/api/viewslaptops', (req, res) => {

  const sql = `SELECT * FROM smartphones where product ='laptops' ORDER BY id DESC;
  `;


// Execute the SQL query
connection.query(sql, (err, results) => {
  if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Failed to fetch products' });
  } else {
      res.json(results);
      console.log('Products fetched successfully');
  }
});
});



// Route to fetch product names
app.get('/api/pdtname', (req, res) => {
  const sql = 'SELECT pdt_name FROM smartphones'; // Assuming 'smartphones' is your table name
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching product names:', err);
      res.status(500).json({ error: 'Failed to fetch product names' });
    } else {
      const productNames = results.map(result => result.pdt_name);
      res.json(productNames);
    }
  });
});

// Route to fetch RAM options
app.get('/api/ram_options', (req, res) => {
  // Replace the following array with your actual RAM options
  const ramOptions = ['2GB', '4GB', '8GB', '16GB', '32GB'];
  res.json(ramOptions);
});

// Route to fetch storage options
app.get('/api/storage_options', (req, res) => {
  // Replace the following array with your actual storage options
  const storageOptions = ['32GB', '64GB', '128GB', '256GB', '512GB'];
  res.json(storageOptions);
});
app.post('/api/add_to_wishlist', (req, res) => {
  const productName = req.body.product_name;

  // Query the database to retrieve product details based on the product name
  const sql = 'SELECT pdt_name, current_price, initial_price, storage_capacity, ram, camera_setup, image_path FROM smartphones WHERE pdt_name = ?';
  connection.query(sql, [productName], (err, results) => {
      if (err) {
          console.error('Error retrieving product details from database:', err);
          res.status(500).json({ error: 'Failed to add product to wishlist' });
          return;
      }
      if (results.length === 0) {
          res.status(404).json({ error: 'Product not found' });
          return;
      }
      const productDetails = results[0];

      // Check if the product already exists in the wishlist
      const checkIfExistsSql = 'SELECT * FROM wishlist WHERE pdt_name = ?';
      connection.query(checkIfExistsSql, [productDetails.pdt_name], (err, results) => {
          if (err) {
              console.error('Error checking if product exists in wishlist:', err);
              res.status(500).json({ error: 'Failed to add product to wishlist' });
              return;
          }
          if (results.length > 0) {
              res.status(400).json({ error: 'Product already exists in the wishlist' });
              return;
          }

          // Add product to the wishlist table
          const wishlistSql = 'INSERT INTO wishlist (pdt_name, current_price, initial_price, storage_capacity, ram, camera_setup, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)';
          connection.query(wishlistSql, [productDetails.pdt_name, productDetails.current_price, productDetails.initial_price, productDetails.storage_capacity, productDetails.ram, productDetails.camera_setup, productDetails.image_path], (err) => {
              if (err) {
                  console.error('Error adding product to wishlist:', err);
                  res.status(500).json({ error: 'Failed to add product to wishlist' });
                  return;
              }
              res.status(200).json({ message: 'Product added to wishlist successfully' });
          });
      });
  });
});

app.get('/api/get_wishlist', (req, res) => {
  // Query the database to fetch wishlist data
  const sql = 'SELECT * FROM wishlist';
  connection.query(sql, (err, results) => {
      if (err) {
          console.error('Error fetching wishlist data:', err);
          res.status(500).json({ error: 'Failed to fetch wishlist data' });
          return;
      }
      res.status(200).json(results);
  });
});


// Route to fetch all pdt_name data from the table
app.get('/api/get_product_names', (req, res) => {
  // Query the database to fetch all pdt_name data
  const sql = 'SELECT pdt_name FROM smartphones';
  connection.query(sql, (err, results) => {
      if (err) {
          console.error('Error fetching product names:', err);
          res.status(500).json({ error: 'Failed to fetch product names' });
          return;
      }
      // Extract pdt_name from results and send as JSON response
      const productNames = results.map(result => ({ pdt_name: result.pdt_name }));
      res.status(200).json(productNames);
  });
});

// Handle form submission and store data in MySQL database
app.post('/submit_question', (req, res) => {
  const { email, question } = req.body;

  // Insert data into MySQL database
  const sql = `INSERT INTO questions (email, question) VALUES (?, ?)`;
  connection.query(sql, [email, question], (err, result) => {
      if (err) {
          console.error('Error inserting question into database:', err);
          res.status(500).json({ error: 'Error submitting question' });
          return;
      }
      console.log('Question submitted successfully');
      res.status(200).json({ message: 'Question submitted successfully' });
  });
});


// API endpoint to fetch questions
app.get('/api/questions', (req, res) => {
  const sql = 'SELECT * FROM questions';
  connection.query(sql, (err, result) => {
      if (err) {
          console.error('Error fetching questions from database:', err);
          res.status(500).json({ error: 'Error fetching questions' });
          return;
      }
      res.json(result);
  });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
