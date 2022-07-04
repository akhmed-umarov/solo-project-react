import { Router } from "express";



const router = Router()


router.get("/" , (req, res)=>{ 
   res.sendFile(path.resolve(__dirname , 'build' , 'index.html'))
})

router.get( "*" , (req, res)=>{ 
   res.send('Error 404')
})


export default router;