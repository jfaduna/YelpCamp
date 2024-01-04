const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '6576c099b010fd7adc6189bf',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe iste commodi blanditiis explicabo, at beatae possimus error ad nobis nemo voluptatum rem omnis repellendus, quisquam architecto corrupti vero recusandae ex.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dw99dp6ji/image/upload/v1704358699/YelpCamp/xicalo6zookgamq06qbg.jpg',
                    filename: 'YelpCamp/xicalo6zookgamq06qbg',
                },
                {
                    url: 'https://res.cloudinary.com/dw99dp6ji/image/upload/v1704358701/YelpCamp/xtoptu4ltkvtkcvkfmrg.jpg',
                    filename: 'YelpCamp/xtoptu4ltkvtkcvkfmrg',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => mongoose.connection.close()) 
