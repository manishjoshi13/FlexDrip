import app from "./src/app.js";
import {config} from "./src/config/config.js";
import { connectDB } from "./src/config/database.js";
import { errorHandler } from "./src/middleware/errorhandler.js";
import authRouter from "./src/routes/auth.route.js";
import buyerRouter from "./src/routes/buyer.routes.js";
import productRouter from "./src/routes/product.routes.js";
app.listen(config.PORT,()=>{
    console.log(`Server is running on port ${config.PORT}`);
})
connectDB()


app.use('/api/auth',authRouter)
app.use('/api/product',productRouter)
app.use('/api/buyer',buyerRouter)

app.use(errorHandler)

export default app;