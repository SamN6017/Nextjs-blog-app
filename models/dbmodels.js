import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blogs' }]
});

const blogschema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    date: { type: Date, default: Date.now },
    imageurl: { type: String }
});

const Users = mongoose.models.Users || mongoose.model('Users', userSchema);
const Blogs = mongoose.models.Blogs || mongoose.model('Blogs', blogschema);

export { Users, Blogs };