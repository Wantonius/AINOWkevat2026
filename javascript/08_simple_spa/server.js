const express = require("express");

const app = express();

app.use("/",express.static("frontend"));
app.use(express.json());

let database = [];
let id = 100;

//CRUD API
//base url: /api/shopping
//GET 		/api/shopping get all items
//POST 		/api/shopping post new item
//DELETE	/api/shopping/:id remove item with id
//PUT 		/api/shopping/:id update item with id

//ITEM
//id Number
//type String
//count Number
//price Number

//SHOPPING API

app.get("/api/shopping",function(req,res) {
	return res.status(200).json(database);
})

app.post("/api/shopping",function(req,res) {
	const item = {
		id:id,
		type:req.body.type,
		count:req.body.count,
		price:req.body.price
	}
	id++;
	database.push(item);
	return res.status(201).json(item);
})

app.delete("/api/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id);
	database = database.filter(item => tempId !== item.id);
	return res.status(200).json({"Message":"Success"});
})

app.put("/api/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id);
	let item = {
		id:tempId,
		type:req.body.type,
		count:req.body.count,
		price:req.body.price
	}
	for(let i=0;i<database.length;i++) {
		if(tempId === database[i].id) {
			database.splice(i,1,item);
			return res.status(200).json({"Message":"Success"});
		}
	}
	return res.status(404).json({"Message":"Not found"});
})

console.log("Running in port 3000");
app.listen(3000);