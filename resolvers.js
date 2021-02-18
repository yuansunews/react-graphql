const { AuthenticationError } = require("apollo-server")

//example
const user = {
    _id: "1",
    name: "John Dow",
    email: "yuansunews3@gmail.com",
    picture: "https://cloudinary.com/asdf"
}

const authenticated = next => (parent, args, context, info) => {
    console.log(context.currentUser)
    if(!context.currentUser){
        throw new AuthenticationError('You must be logged in ');
    }
    return next(parent, args, context, info);
    
}

module.exports = {
    Query: {
        me: authenticated((parent, args, context) => context.currentUser)
    }
}