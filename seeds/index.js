const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

// mongoose.connect("mongodb://localhost:27017/yelp-camp", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });
mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: "64b29eef4ed498ac4e3e4540",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "idk what to say, plz dun block me",
            price,
            geometry: {
              type: "Point",
              coordinates: [-113.1331, 47.0202]
            },
            images : [
                {
                  url: 'https://res.cloudinary.com/din8z1kl7/image/upload/v1690392641/yelpCamp/cu3alaydfk3x44fkxryi.png',
                  filename: 'yelpCamp/cu3alaydfk3x44fkxryi',
                },
                {
                  url: 'https://res.cloudinary.com/din8z1kl7/image/upload/v1690392641/yelpCamp/smmu9vn4thksvuyhois2.png',
                  filename: 'yelpCamp/smmu9vn4thksvuyhois2',
                },
                {
                  url: 'https://res.cloudinary.com/din8z1kl7/image/upload/v1690392641/yelpCamp/htew2smekbemaxbnvdbz.png',
                  filename: 'yelpCamp/htew2smekbemaxbnvdbz',
                }
              ]
        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    })
    .catch(err => console.log(err))