package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
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
	ImgLink     string `json:"img_link"`
	ImgAlt      string `json:"img_alt"`
	ImgSrc      string `json:"img_src"`
}

//USER: Hold all user data from contact form

type UserData struct {
	UserID        string `json:"product_id"`
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
	fmt.Println()
	fmt.Println("pulling products")
	fmt.Println()
	//Set header content tyep to application/json
	w.Header().Set("Content-Type", "application/json")
	enableCors(&w)
	//Init Products var as a slice Product struct
	products := []Product{}
	//query sent to DB
	query := "SELECT * FROM products"

	//rows = results of the query
	rows, err := db.Query(query)

	if err != nil {
		fmt.Println(err)
		return
		// panic(err.Error())
	}
	// if there is NOT an error do this
	for rows.Next() {
		// create a new variable and set its value to our existing struct
		//Create new struct for each rown
		var product Product
		//scan the rows and check for discrepancies and store in "err" so we know what the error was for
		err := rows.Scan(&product.ProductID, &product.Name, &product.Price, &product.Description, &product.Console, &product.ImgLink, &product.ImgAlt, &product.ImgSrc)
		if err != nil {
			fmt.Println(err)
			return
			// panic(err.Error())
		}
		// append the returned values to our products variable
		products = append(products, product)
	}

	json.NewEncoder(w).Encode(products)
}

func createUser(w http.ResponseWriter, r *http.Request) {
	fmt.Println()
	fmt.Println("User Endpoint hit")
	fmt.Println()
	//Set header content tyep to application/json
	w.Header().Set("Content-Type", "application/json")
	enableCors(&w)

	var user UserData

	json.NewDecoder(r.Body).Decode(&user)

	stmt, err := db.Prepare("INSERT INTO user_data (firstname, lastname, email, phone, contact_method, refferal, comments) VALUES (?,?,?,?,?,?,?)")

	if err != nil {
		fmt.Println(err)
		return
		// panic(err.Error())
	}
	// if there is NOT an error do this
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}
	json.Unmarshal(body, &user)

	_, err = stmt.Exec(user.FirstName, user.LastName, user.Email, user.Phone, user.ContactMethod, user.Referral, user.Comments)
	if err != nil {
		fmt.Println(err)
		return
		// panic(err.Error())
	}
	fmt.Println()
	fmt.Println("User Posted")
	fmt.Println()

	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(user)
}

func main() {
	//NEVER COMMIT REAL CREDENTIALS TO GITHUB!!!!!!
	//mySQL driver import                                    IP FOR LOCAL HOST
	//database, err := sql.Open("mysql", "root:password@tcp(127.0.0.1:3306)/ecommerce") // local
	//DB connection           Driver   User  Password
	database, err := sql.Open("mysql", "root:root@tcp(database:3306)/ecommerce") // docker container
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
	//r.HandleFunc("/products/{id}", getProduct).Methods("GET") //get single by id Decided to handle all filter in front end
	r.HandleFunc("/users", createUser).Methods("POST") // post user info to DB
	//r.HandleFunc("/errors", logError).Methods("POST")         // log error to DB

	//run server (specify port and router variable set when initilizing mux router)
	log.Fatal(http.ListenAndServe(":8070", r))
}
