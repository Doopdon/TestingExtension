const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send("FUCK");
})

app.listen(port,() => {
	console.log("app is running on "+port);
})