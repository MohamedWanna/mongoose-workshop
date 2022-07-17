var express = require("express");
var mongoose = require("mongoose");
const personModel = require("./personmodel");
var app = express();
const port = 6000;

//possibllité 1: coonect to MongoDB Compass
//mongoose.connect('mongodb://localhost:27017/testDB', ...

//possibllité 2: coonect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://MohamedWanna:alphaomega2022@cluster0.isyo3.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected");
  })
  .catch((e) => {
    console.log("Something went wrong", e);
  });

//traitement
//first method to send data the database mongodb
const person = new personModel({
  name: "Mohamed Wanna",
  address: "Rue Ali Belhouane",
  age: 34,
  favouritefood: ["Couscous", "metabega", "fraise jus"],
});
const getall = async () => {
try {
    const allpeople = await personModel.find({});
        console.log(allpeople);
}   catch (error) {
        console.log(error);
    }
};
//getall();

const findOne = async () => {
try {
    const oneperson = await personModel.findOneAndUpdate(
        { _id: "62d44188330af3c32eabb893" },
        { $set: { age: 30 } },
        { new: true }
    );
    await oneperson.save();
    console.log(oneperson)
    
} catch (error) {
    console.log(error)
}
};
findOne();
//second method with another examples
//person.save().then(doc => {
//console.log(doc)
//}).catch((error)=> console.log(error));

//personModel.create([{
//name:"Alex Swift",
//address: "Rue Cuba Torn City",
//age:   25,
//favouritefood: ["Pizza","Sandwich","Pepsi"],
//},
//{
//name:"Super Sonic",
// address: "Rue Cuba Los Angles City",
// age:   20,
//favouritefood: ["Hot dogs","Hamburger","Milkshake"],
// },
//],
//(err,data)=>err?console.log(err): console.log(data)
// );

app.listen(port, (err) =>
  err ? console.log(err) : console.log(`Server is running on port ${port}`)
);
