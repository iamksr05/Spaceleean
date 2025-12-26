import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/SPACELEEAN';

// Middleware
const allowedOrigins = [
    'http://localhost:8080',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL,
].filter(Boolean) as string[];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);

        // Allow localhost and configured origins
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // Allow all vercel.app and onrender.com domains
        if (origin.endsWith('.vercel.app') || origin.endsWith('.onrender.com')) {
            return callback(null, true);
        }

        callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Schema
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: String,
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.post('/api/contact', async (req, res) => {
    console.log('Received contact form submission:', req.body);
    try {
        const { name, email, company, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required.' });
        }

        const newContact = new Contact({
            name,
            email,
            company,
            message,
        });

        await newContact.save();

        res.status(201).json({ message: 'Contact details saved successfully!' });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all contacts
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        console.error('ADMIN_PASSWORD env variable is not set!');
        // Fallback or error - better to be safe and deny if not set, OR provide a default for dev?
        // User used "Aayush@2612#" previously.
        if (password === "Aayush@2612#") {
            return res.json({ success: true });
        }
        return res.status(500).json({ error: 'Server misconfiguration' });
    }

    if (password === adminPassword) {
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Incorrect password' });
    }
});

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
