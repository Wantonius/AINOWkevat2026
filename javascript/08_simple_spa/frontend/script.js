var mode = 0;

window.onload = function() {
	createForm();
	getShoppingList();
}

createForm = () => {
	const root = document.getElementById("root");
	const form = document.createElement("form");
	
	//Type label and input
	const typeLabel = document.createElement("label");
	typeLabel.setAttribute("for","type");
	const typeLabelText = document.createTextNode("Type:");
	typeLabel.appendChild(typeLabelText);
	const typeInput = document.createElement("input");
	typeInput.setAttribute("type","text");
	typeInput.setAttribute("name","type");
	typeInput.setAttribute("id","type");

	//Count label and input
	const countLabel = document.createElement("label");
	countLabel.setAttribute("for","count");
	const countLabelText = document.createTextNode("Count:");
	countLabel.appendChild(countLabelText);
	const countInput = document.createElement("input");
	countInput.setAttribute("type","number");
	countInput.setAttribute("name","count");
	countInput.setAttribute("id","count");	

	//Price label and input
	const priceLabel = document.createElement("label");
	priceLabel.setAttribute("for","price");
	const priceLabelText = document.createTextNode("Price:");
	priceLabel.appendChild(priceLabelText);
	const priceInput = document.createElement("input");
	priceInput.setAttribute("type","number");
	priceInput.setAttribute("name","price");
	priceInput.setAttribute("id","price");

	//Submit Button
	const submitButton = document.createElement("input");
	submitButton.setAttribute("type","submit");
	submitButton.setAttribute("name","submitbutton");
	submitButton.setAttribute("id","submitbutton");
	submitButton.setAttribute("value","Add");
	const br1 = document.createElement("br");
	const br2 = br1.cloneNode();
	const br3 = br1.cloneNode();
	form.append(typeLabel,typeInput,br1,countLabel,countInput,br2,priceLabel,priceInput,br3,submitButton);
	form.addEventListener("submit",function(e) {
		e.preventDefault();
		addShoppingItem();
	})
	root.appendChild(form);
}

addShoppingItem = async () => {
	const typeInput = document.getElementById("type");
	const countInput = document.getElementById("count");
	const priceInput = document.getElementById("price");
	const item = {
		"type":typeInput.value,
		"count":countInput.value,
		"price":priceInput.value
	}
	let url = "/api/shopping";
	let request = {
		"method":"POST",
		"headers":{
			"Content-Type":"application/json"
		},
		"body":JSON.stringify(item)
	}
	if(mode) {
		url = "/api/shopping/"+mode;
		request.method = "PUT";
	}
	const response = await fetch(url,request);
	if(response.ok) {
		typeInput.value = "";
		countInput.value = "";
		priceInput.value = "";
		const submitButton = document.getElementById("submitbutton");
		submitButton.value = "Add";
		mode = 0;
		getShoppingList();
	} else {
		console.log("Server responded with a status",response.status);
	}
}

getShoppingList = async () => {
	const response = await fetch("/api/shopping");
	if(response.ok) {
		const list = await response.json();
		populateTable(list);
	} else {
		console.log("Server responded with a status",response.status);
	}
}

removeItem = async (id) => {
	const url = "/api/shopping/"+id
	const request = {
		"method":"DELETE"
	}
	const response = await fetch(url,request);
	if(response.ok) {
		getShoppingList();
	} else {
		console.log("Server responded with a status",response.status);
	}
}

editItem = (item) => {
	let typeInput = document.getElementById("type");
	let countInput = document.getElementById("count");
	let priceInput = document.getElementById("price");
	mode = item.id;
	typeInput.value = item.type;
	countInput.value = item.count;
	priceInput.value = item.price;
	const submitButton = document.getElementById("submitbutton");
	submitButton.value = "Save";
}

populateTable = (list) => {
	const root = document.getElementById("root");
	const oldTable = document.getElementById("table");
	if(oldTable) {
		root.removeChild(oldTable);
	}
	const table = document.createElement("table");
	table.setAttribute("id","table");
	
	//Table headers
	const header = document.createElement("thead");
	const headerRow = document.createElement("tr");
	
	//Type header
	const typeHeader = document.createElement("th");
	const typeHeaderText = document.createTextNode("Type");
	typeHeader.appendChild(typeHeaderText);
		
	//Count header 
	const countHeader = document.createElement("th");
	const countHeaderText = document.createTextNode("Count");
	countHeader.appendChild(countHeaderText);
1
1	//Price header
	const priceHeader = document.createElement("th");
	const priceHeaderText = document.createTextNode("Price");
	priceHeader.appendChild(priceHeaderText);
	
	//Remove header
	const removeHeader = document.createElement("th");
	const removeHeaderText = document.createTextNode("Remove");
	removeHeader.appendChild(removeHeaderText);

	//Edit header
	const editHeader = document.createElement("th");
	const editHeaderText = document.createTextNode("Edit");
	editHeader.appendChild(editHeaderText);

	headerRow.append(typeHeader,countHeader,priceHeader,removeHeader,editHeader);
	header.appendChild(headerRow);
	table.appendChild(header);

	//TAble body
	const body = document.createElement("tbody");
	for(let i=0;i<list.length;i++) {
		const row = document.createElement("tr");
		for(x in list[i]) {
			if (x === "id") {
				continue;
			}
			const column = document.createElement("td");
			const info = document.createTextNode(list[i][x]);
			column.appendChild(info);
			row.appendChild(column);
		}
		
		//remove Button
		const removeColumn = document.createElement("td");
		const removeButton = document.createElement("button");
		const removeText = document.createTextNode("Remove");
		removeButton.appendChild(removeText);
		removeButton.addEventListener("click",function(e) {
			removeItem(list[i].id);
		})
		removeColumn.appendChild(removeButton);

		const editColumn = document.createElement("td");
		const editButton = document.createElement("button");
		const editText = document.createTextNode("Edit");
		editButton.appendChild(editText);
		editButton.addEventListener("click",function(e) {
			editItem(list[i]);
		})
		editColumn.appendChild(editButton);		
		
		row.append(removeColumn,editColumn);
		body.appendChild(row)
	}
	table.appendChild(body);
	root.appendChild(table);
}