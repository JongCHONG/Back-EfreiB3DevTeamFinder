import mongoose from 'mongoose'

const userSchema = mongoose.Schema ({
    username: String,
    password: String,
    valorant_id: String,
    rank: String,
    mail: String,
    discord: String,
    announcements : [],
    region : String,
    availability: [String],
    teams: [],
    conversations: [],
    avatar: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})


const User = mongoose.model('User', userSchema);

export default User;