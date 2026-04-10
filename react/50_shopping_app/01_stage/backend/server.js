const express = require("express");

const app = express();

app.use(express.json());

//DATABASE
let database = [];
let id = 100;

//ShoppingItem
//type:String
//count:number
//price:number
//id:number

//CRUD
//get items
app.get("/api/shopping",function(req,res) {
	return res.status(200).json(database);
})

//add new item
app.post("/api/shopping",function(req,res) {
	let item = {
		type:req.body.type,
		count:req.body.count,
		price:req.body.price,
		id:id
	}
	id++;
	database.push(item);
	return res.status(201).json(item);
})

//remove item
app.delete("/api/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id);
	let tempDatabase = database.filter(item => item.id !== tempId);
	database = tempDatabase;
	return res.status(200).json({"Message":"Success"});
})
//edit item
app.put("/api/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id);
	let item = {
		type:req.body.type,
		count:req.body.count,
		price:req.body.price,
		id:tempId
	}
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			database.splice(i,1,item);
			return res.status(200).json({"Message":"Success"})
		}
	}
	return res.status(404).json({"Message":"Not found"})
})

app.listen(3000);

console.log("Running in port 3000");

