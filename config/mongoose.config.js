const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://ryesan58:Manhattan212!@cluster0.ttjc3.mongodb.net/?retryWrites=true&w=majority' || "mongodb://localhost/PhotoCred", {
	useNewUrlParser: true, 
	useUnifiedTopology: true,
})

	.then(() => console.log('established connection to database'))
  .catch( err => console.log('Something went wrong when connecting to database', err))
