import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Create MySQL connection
const db = mysql.createConnection({
    host: "localhost", // MySQL server host
    user: "root", // MySQL username
    password: "Pratyay@2024", // MySQL user's password
    database: "test" // MySQL database name to connect to
});

// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
    }
    console.log("Connected to MySQL database✅");
});

// Root endpoint to test backend server
app.get("/", function(req, res) {
    res.send("Hello from the backend!"); // Responds with "Hello from the backend!" on accessing the root URL
});

// Endpoint to retrieve all books from the "books" table (GET request)
app.get("/books", (req, res) => {
    const query = "SELECT * FROM books"; // MySQL query to select all data from the "books" table
    db.query(query, (err, data) => {
        if (err) {
            console.error("Error fetching data:", err);
            res.status(500).json({ error: "Error fetching data" }); // Send error response for failed fetch
            return;
        }
        res.json(data); // Send retrieved data as a JSON response
    });
});

// Endpoint to insert a new book into the "books" table (POST request)
app.post("/books", (req, res) => {
    const { title, desc, cover, price } = req.body;
    const query = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?, ?, ?, ?)";
    const values = [title, desc, cover, price];
    
    db.query(query, values, (err, data) => {
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).json({ error: "Error inserting data" }); // Send error response for failed insert
            return;
        }
        res.json("Data inserted successfully"); // Send success response for successful insert
    });
});

// Endpoint to delete a book from the "books" table by ID (DELETE request)
app.delete("/books/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM books WHERE id = ?";
    
    db.query(query, id, (err, data) => {
        if (err) {
            console.error("Error deleting data:", err);
            res.status(500).json({ error: "Error deleting data" }); // Send error response for failed delete
            return;
        }
        res.json("Data deleted successfully"); // Send success response for successful delete
    });
});


// Endpoint to update a book in the "books" table by ID (PUT request)
app.put("/books/:id", (req, res) => {
    const id = req.params.id;
    const { title, desc, cover, price } = req.body;
    const query = "UPDATE books SET title=?, `desc`=?, cover=?, price=? WHERE id=?";
    const values = [title, desc, cover, price, id];
    
    db.query(query, values, (err, data) => {
        if (err) {
            console.error("Error updating data:", err);
            res.status(500).json({ error: "Error updating data" }); // Send error response for failed update
            return;
        }
        res.json("Book has been updated successfully"); // Send success response for successful update
    });
});




// Start the Express server on port 7000
app.listen(7000, () => {
    console.log("Server started on port 7000✅");
});
