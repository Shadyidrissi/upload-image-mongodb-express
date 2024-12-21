import express from 'express';
import connect from './database/conn.js';
import cors from 'cors';

const app = express();
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;

// import model
import Post from './model/post.model.js';

/** GET: http://localhost:8080 */
app.get('/', (req, res) => {
    try{
        Post.find({}).then(data => {
            res.json(data)
        }).catch(error => {
            res.status(408).json({ error })
        })
    }catch(error){
        res.json({error})
    }
})

/** POST: http://localhost:8080/uploads  */
app.post("/uploads", async (req, res) => {
    const body = req.body;
    try{
        const newImage = await Post.create(body)
        newImage.save();
        res.status(201).json({ msg : "New image uploaded...!"})
    }catch(error){
        res.status(409).json({ message : error.message })
    }
})


app.listen(port, async() => {
    await connect()
    console.log(`Server connected to http://localhost:${port}`);
})


