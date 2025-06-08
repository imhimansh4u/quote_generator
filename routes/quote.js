import {Router} from 'express'
import "dotenv/config"

const router = new Router()


router.get('/', async (req , res) =>{
    try {
        const response = await fetch(process.env.API_URL);
        const data = await response.json();
        res.json(data); // send the whole data to frontend
    } catch (error) {
        res.status(500).json({error : "failed to fetch quote"});
    }
});

export default router ;
