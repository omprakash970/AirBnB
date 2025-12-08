const mongoose= require('mongoose');
const initData = require('./data');
const Listing = require('../Models/listing');
const MONGO_URL="mongodb://localhost:27017/wanderlust";
async function main(){
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB");
        await initDB();
        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        try { await mongoose.connection.close(); } catch {}
        process.exit(1);
    }
}
const initDB=async()=>{
    await Listing.deleteMany({});
    const raw = initData && initData.data ? initData.data : [];
    const normalized = raw.map((item)=>({
        title: item.title,
        description: item.description,
        image: typeof item.image === 'string' ? item.image : (item.image && item.image.url) ? item.image.url : "",
        price: item.price,
        location: item.location,
        Country: item.country
    }));
    await Listing.insertMany(normalized);
    console.log("Database initialized with sample data");

};
// kick off
main();