const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp  = new Campground({
            author: '61efb8a2f9323162e26a1e25',
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            //image: 'https://source.unsplash.com/collection/483251',
            description: 'the area or place (such as a field or grove) used for a camp, for camping, or for a camp meeting. Synonyms Example Sentences Learn More About campground.',
            price: price,
            images: [
                {
                    url : "https://res.cloudinary.com/devzzvdis/image/upload/v1643191245/YelpCamp/xgsq1kvo054ufcxjldxv.png",
                    filename : "YelpCamp/xgsq1kvo054ufcxjldxv"
                },
                { 
                    url : "https://res.cloudinary.com/devzzvdis/image/upload/v1643191246/YelpCamp/vgvr7n5nnuvxw6gxjbl2.jpg",
                    filename : "YelpCamp/vgvr7n5nnuvxw6gxjbl2"
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});