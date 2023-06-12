import mongoose from 'mongoose'

const teamSchema = mongoose.Schema ({
    name: String,
    description: String,
    team_leader_id: String,
    region : String,
    logo: String,
    availability: [String],
    teammates: [],
    announcements : [],
    createdAt: {
        type: Date,
        default: new Date()
    }
})


const Team = mongoose.model('Team', teamSchema);

export default Team;