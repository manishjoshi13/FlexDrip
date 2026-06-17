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
// if(!process.env.GOOGLE_CLIENT_ID){
//     throw new Error("GOOGLE_CLIENT_ID is not defined");
// }
// if(!process.env.GOOGLE_CLIENT_SECRET){
//     throw new Error("GOOGLE_CLIENT_SECRET is not defined");
// }

export const config= {
    PORT:process.env.PORT,
    MONGODB_URI:process.env.MONGODB_URI,
    FRONTEND_URL:process.env.FRONTEND_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN,
    ENVIRONMENT:process.env.ENVIRONMENT,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    IMAGEKIT_PUBLIC_KEY:process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY:process.env.IMAGEKIT_PRIVATE_KEY,
    
};
    
