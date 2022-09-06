const mongoose = require("mongoose");
const Campground = require("../models/campground");
const { places, descriptors } = require("./seedHelpers");
const cities = require("./cities");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 100) + 10;
    const camp = new Campground({
      //Your user id
      author: "631180e21febc1e610b945a5",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, consectetur!",
      price,
      geometry: {
        type: "Point",
        coordinates: [-119.596848, 37.756718],
      },
      images: [
        {
          url: "https://res.cloudinary.com/itis-solutions/image/upload/v1662349125/YelpCamp/iaxgivplboy6dhsspy56.jpg",
          filename: "YelpCamp/iaxgivplboy6dhsspy56",
        },
        {
          url: "https://res.cloudinary.com/itis-solutions/image/upload/v1662349126/YelpCamp/Yosemitewaterfall_16x9_zx3yld.jpg",
          filename: "YelpCamp/Yosemitewaterfall_16x9_zx3yld",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
