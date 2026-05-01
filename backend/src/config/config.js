import 'dotenv/config'

// if(!process.env.PORT){
//     throw new Error("PORT is not defined");
// }
// if(!process.env.MONGODB_URI){
//     throw new Error("MONGODB_URI is not defined");
// }
// if(!process.env.FRONTEND_URL){
//     throw new Error("FRONTEND_URL is not defined");
// }
// if(!process.env.JWT_SECRET){
//     throw new Error("JWT_SECRET is not defined");
// }
// if(!process.env.JWT_EXPIRES_IN){
//     throw new Error("JWT_EXPIRES_IN is not defined");
// }


export const config= {
    PORT:process.env.PORT,
    MONGODB_URI:process.env.MONGODB_URI,
    FRONTEND_URL:process.env.FRONTEND_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN,
    ENVIRONMENT:process.env.ENVIRONMENT
};
    
