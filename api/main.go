package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	//need mysql drivers
	// install via CLI: $ go get -u github.com/go-sql-driver/mysql
	_ "github.com/go-sql-driver/mysql"
)

//set port api is running on
var port = "8070"

//set global variable for DB - Use pointer to "point" to existing value in package. Makes it so you dont have to re-establish connection
var db *sql.DB

//enable coors (allows acess to resources from a "third party" origin)

func enableCors(w *http.ResponseWriter) {
	// cross origin resource sharing
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	//(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:8070/products")
	//w.Header().Set("Access-Control-Allow-Methods", "POST, GET")
}

//ErrorLog: Log any errors
type ErrorLog struct {
	ErrorCode  string `json:"error_code"`
	LogMessage string `json:"log_message"`
}

//Product: Holds all Product Data
type Product struct {
	ProductID   string `json:"product_id"`
	Name        string `json:"name"`
	Price       string `json:"price"`
	Description string `json:"description"`
	Console     string `json:"console"`
}

//USER: Hold all user data from contact form

type UserData struct {
	FirstName     string `json:"firstname"`
	LastName      string `json:"lastname"`
	Email         string `json:"email"`
	Phone         string `json:"phone"`
	ContactMethod string `json:"contact_method"`
	Referral      string `json:"referral"`
	Comments      string `json:"comments"`
}

//Function to pull all products from DB
func getProducts(w http.ResponseWriter, r *http.Request) {
	//Set header content tyep to application/json
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")

	//Init Products var as a slice Product struct
	products := []Product{}
	//query sent to DB
	query := "SELECT * FROM products"

	//rows = results of the query
	rows, err := db.Query(query)

	if err != nil {
		panic(err.Error())
	}
	// if there is NOT an error do this
	for rows.Next() {
		// create a new variable and set its value to our existing struct
		//Create new struct for each rown
		var product Product
		//scan the rows and check for discrepancies and store in "err" so we know what the error was for
		err := rows.Scan(&product.ProductID, &product.Name, &product.Price, &product.Description, &product.Console) //, &product.ImgMain, &product.ImgB, &product.ImgC)
		if err != nil {
			panic(err.Error())
		}
		// append the returned values to our products variable
		products = append(products, product)
	}

	json.NewEncoder(w).Encode(products)
}

//Function to get single product
// func getProduct(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	params := mux.Vars(r) // Get any params

// 	//Loop through products and find with correct id
// 	for _, item := range books {
// 		if item.ID == params["id"] {
// 			json.NewEncoder(w).Encode(item)
// 			return
// 		}
// 	}
// 	json.NewEncoder(w).Encode(&Book{})
// }

// function to post user info to DB
// func createUser(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	var book Book
// 	_ = json.NewDecoder(r.Body).Decode(&book)
// 	//create book ID rand int from 1-10000000 AND convert int to string
// 	book.ID = strconv.Itoa(rand.Intn(10000000)) //mock ID DO NOT USE FOR PRODUCTION could create the same ID
// 	books = append(books, book)
// 	json.NewEncoder(w).Encode(book)
//}

//function to log erros to error DB
// func logError(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	var book Book
// 	_ = json.NewDecoder(r.Body).Decode(&book)
// 	//create book ID rand int from 1-10000000 AND convert int to string
// 	book.ID = strconv.Itoa(rand.Intn(10000000)) //mock ID DO NOT USE FOR PRODUCTION could create the same ID
// 	books = append(books, book)
// 	json.NewEncoder(w).Encode(book)
// }

func main() {
	//NEVER COMMIT REAL CREDENTIALS TO GITHUB!!!!!!
	//mySQL driver import                                    IP FOR LOCAL HOST
	database, err := sql.Open("mysql", "root:password@tcp(127.0.0.1:3306)/ecommerce") // local
	//DB connection           Driver   User  Password
	//database, err := sql.Open("mysql", "root:password@tcp(database:3306)/ecommerce") // docker container
	if err != nil {
		panic(err.Error())
	}
	fmt.Println("Connected to MySQL Database")

	//connects global variable "db" to the database connection we made
	db = database
	//Run DB with defer, then ALWAYS close connection immediatly after opening
	defer db.Close()

	//Init mux router
	//creates new router
	r := mux.NewRouter()

	//Route Handlers / Establish Endpoints
	r.HandleFunc("/products", getProducts).Methods("GET") //get all
	//r.HandleFunc("/products/{id}", getProduct).Methods("GET") //get single by id
	//r.HandleFunc("/users", createUser).Methods("POST")        // post user info to DB
	//r.HandleFunc("/errors", logError).Methods("POST")         // log error to DB

	//run server (specify port and router variable set when initilizing mux router)
	log.Fatal(http.ListenAndServe(":8070", r))
}
