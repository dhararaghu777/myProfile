// social media details

const social = (req, res) => {
   
    const {linkedIn, instagram, youtube, facebook} = req.body;

    const socialDetails = {
        linkedIn,
        instagram,
        youtube,
        facebook
    }

    return socialDetails;
}

const mobile = (req, res) => {

    const {mobile} = req.body;
    return mobile;
}


const  skills = (req, res) => {
    const {name, image} = req.body;

    const skillDetails = {
        skillName : name,
        skillImage: image
    }

    return skillDetails;
}


const experience = (req, res) => {
    const {name, location, yoe, from , to, current} = req.body;

     const details = {
         companyName: name,
         location: location,
         yoe: yoe,
         from: new Date(from),
         to: new Date(to),
         current: current
     }

     return details;
}


const project = (req, res) => {
    const {name, url, duration, from, to, current} = req.body;

    const details = {
        projectName: name,
        projectUrl: url,
        duration: duration,
        from: new Date(from),
        to: new Date(to),
        current: current
    }

    return details;
}

const achievement = (req, res) => {
    const {name, details, date} = req.body;

    const detailObj = {
        name: name,
        details: details,
        date: new Date(date)
    }

    return detailObj;
}



const extraImages = (req, res) => {
    const {image} = req.body;

    return image;
}


const extraVideo = (req, res) => {

    const {video, description} = req.body;

    const details = {
        video: video,
        description: description
    }

    return details;
}

const education = (req, res) => {

    const {college, degree, yop, percentage, cgpa, stream}= req.body;

    const details = {
        college: college,
        degree: degree,
        yop: yop,
        percentage: percentage,
        cgpa: cgpa,
        stream: stream
    }

    return details;
}

const profileObj = {
    social,
    mobile,
    skills,
    project,
    experience,
    achievement,
    extraImages,
    extraVideo,
    education
} 
module.exports = profileObj;



