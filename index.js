import express from "express";
import path from "path";
import router from "./server/router/router.js";


const app = express()
const PORT = process.env.PORT ?? 3000 ; 
const __dirname = path.resolve();

app.use(express.static(path.resolve(__dirname , "build")))


app.use(router)



app.listen(PORT , ()=>{ 
   console.log(`Your server has been started in port ${PORT}`);
})