const mongoose = require('mongoose');
const {Schema} = mongoose;

const profileSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    profilePic: {
        type: String
    },

    mobile : {
        primary: {
            type: String
        },
        secondary: {
            type: String
        }
    },

    social: {
        linkedIn: {
            type: String
        },
        youtube: {
            type: String,
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        github:{
            type: String
        }
    },

    skills: [{
        skillName: String,
        skillImage: String,
    }],

    experience: [
        {
            companyName: String,
            location: String,
            position:String,
            yoe: String,
            from: Date,
            to: Date,
            current: {
                type: Boolean,
                default: false
            }
        }
    ],

    education : [
        {
            college: String,
            degree: String,
            yop: String,
            percentage: String,
            cgpa : String,
            stream: String

        }
    ],

    projects: [
        {
            projectName: String,
            projectUrl: String,
            duration: Number,
            from: Date,
            to: Date,
            current: {
                type: Boolean,
                default: false
            }
        }
    ],

    achievements : [
        {
            name: String,
            details: String,
            date: Date
        }
    ],

    extra : {
        personalImages: [String],
        personalVideos: [{
            video: String,
            description: String
        }],

    }   

})

module.exports = Profile = mongoose.model('profile', profileSchema);