const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgrounds');

mongoose.connect('mongodb://127.0.0.1:27017/campingCommunity')
    .then(() => {
        console.log("Database Connected!");
    })
    .catch ((err) => {
        console.log("Connection Error!");
        console.log(err);
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i=0; i<200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 50) + 10;
        const camp = new Campground ({
            title: `${sample(places)} ${sample(descriptors)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            author: '66b291fa6c6e1a452eefa4f6',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dtnkkyk7v/image/upload/v1722567147/CampIndia/tnuowumstuebuoxrf2gi.jpg',
                    filename: 'CampIndia/tnuowumstuebuoxrf2gi'
                },
                {
                    url: 'https://res.cloudinary.com/dtnkkyk7v/image/upload/v1722567146/CampIndia/wygajpaq25qbmurapjyg.jpg',
                    filename: 'CampIndia/wygajpaq25qbmurapjyg'
                },
                {
                    url: 'https://res.cloudinary.com/dtnkkyk7v/image/upload/v1722567149/CampIndia/yactsnz35gym12qotesk.jpg',
                    filename: 'CampIndia/yactsnz35gym12qotesk'
                },
                {
                    url: 'https://res.cloudinary.com/dtnkkyk7v/image/upload/v1722567151/CampIndia/pb0zi6eudqoezdtljdac.jpg',
                    filename: 'CampIndia/pb0zi6eudqoezdtljdac'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ipsum beatae explicabo non enim molestias at iure est dolores. Esse aliquam dicta numquam est mollitia accusamus. Nobis minus fugit ad?',
        })
        await camp.save();
    }
} 

seedDB().then(() => {
    mongoose.connection.close();
});