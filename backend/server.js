import app from "./src/app.js";
import {config} from "./src/config/config.js";
import { connectDB } from "./src/config/database.js";
import { errorHandler } from "./src/middleware/errorhandler.js";
import authRouter from "./src/routes/auth.route.js";

app.listen(config.PORT,()=>{
    console.log(`Server is running on port ${config.PORT}`);
})
connectDB()


app.use('/api/auth',authRouter)

app.use(errorHandler)

export default app;