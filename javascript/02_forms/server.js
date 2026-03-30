const express = require("express");

const app = express();

app.use("/",express.static("frontend"));

app.use(express.json());

app.post("/greet",function(req,res) {
	console.log(req);
	const name = req.body.firstname+" "+req.body.lastname;
	return res.status(201).json({"Greetings":name});
})

console.log("Running in port 3000");

app.listen(3000);