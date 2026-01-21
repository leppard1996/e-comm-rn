import express from 'express';
import path from 'path';
import { env } from './config/env.js';
import { clerkMiddleware } from '@clerk/express';
import { connectDB } from './config/db.js';

const app = express();
const __dirname = path.resolve();

app.use(clerkMiddleware()); // adds auth obj to req

app.get('/api/health', (req, res) => {
    res.status(200).json({ message: "It's on and poppin!" });
});

if(env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../admin/dist")));

    // express way of saying any route not previously defined
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
    })
}
let PORT = env.PORT;
const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log("Server is up and running");
  });
};

startServer();