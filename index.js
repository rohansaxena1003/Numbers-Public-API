import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const port = 3000;
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',async (req, res) => {
    try {
        const response = await axios.get('http://numbersapi.com/random/trivia');
        // console.log(response);
        const data = response.data;
        res.render("index.ejs", { data });
    } catch (error) {
        res.status(500).send("An eroor occurred!!");
    }
   
});

app.post('/', async (req,res)=> {
    console.log(req.body.type);
    try {
        const type = req.body.type;
    const response = await axios.get(`http://numbersapi.com/random/${type}`);
    const data = response.data;
    res.render("index.ejs", { data, type });
    } catch (error) {
        res.status(500).send("An eroor occurred!!");
    }
    
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});