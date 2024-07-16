import mongoose from 'mongoose';

export async function connect() {
    try {
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })
        await  mongoose.connect(process.env.MONGODB_ATLAS_URL!);
    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}