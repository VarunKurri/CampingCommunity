# Camping Community

## Project Description
Camping Community is a Node.js and Express application that allows users to share and review campgrounds. The project uses MongoDB for data storage and integrates services such as Cloudinary for image hosting and Mapbox for geocoding.

## Features
- **User accounts** – register and log in to create and manage campgrounds.
- **Image uploads** – photos are stored on Cloudinary and displayed in a carousel.
- **Interactive maps** – Mapbox powers geocoding and cluster maps for visualizing campground locations.
- **Reviews and ratings** – users can rate campgrounds with a 1–5 star system and leave comments.
- **Security** – sessions stored in MongoDB with input validation and sanitization.

## Environment Configuration
This application relies on environment variables. Create a `.env` file in the project root and define the following variables (values depend on your setup):

```
DB_URL=your_mongodb_url
SECRET=your_session_secret
MAPBOX_TOKEN=your_mapbox_token
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

## Installation
Install the dependencies using npm:

```bash
npm install
```

## Starting the Server
Run the application with the default start script:

```bash
npm start
```

The server will start on the port defined in the `PORT` environment variable or fall back to `3000`.
