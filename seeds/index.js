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
      author: "631180e21febc1e610b945a5",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda, consectetur!",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/itis-solutions/image/upload/v1662349125/YelpCamp/mewjapjrzs04y7cct8pb.jpg",
          filename: "YelpCamp/mewjapjrzs04y7cct8pb",
        },
        {
          url: "https://res.cloudinary.com/itis-solutions/image/upload/v1662349126/YelpCamp/c6kqndw7cdi6alw7prnk.jpg",
          filename: "YelpCamp/c6kqndw7cdi6alw7prnk",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
