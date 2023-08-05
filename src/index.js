const app = require('./app');
const { database } = require('./config');

async function startServer() {
    try {
        // Database synchronization
        await database.sync();
        console.log('Database synchronized successfully.');

        // Start the server after successful database synchronization
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to synchronize the database:', error);
    }
}

startServer();