const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 3000;
const app = express();

var fs = require("fs");

// app.use(express.json());
app.use(cors());

const readMovies=()=>JSON.parse(fs.readFileSync('movies.json','utf8'));


app.get("/movies", (req, res) => res.json(readMovies()));

app.get("/movie/:id", (req, res) => {
  const movie = readMovies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("Movie not found");
  res.json(movie);
});
app.post('/movies',(req,res)=>{``
        const movies= readMovies();
        const movie ={...req.body,id: movies.lenght+1} ;
        movies.push(movie);   
        fs.writeFileSync('movies.json',JSON.stringify(movies,null,2));
        res.status(201).json(movie);  

});
app.delete('/movies/:id',(req,res)=>{   
  let  movies = readMovies();
  const movieIndex= movies.findIndex(m=>m.id==parseInt(req.params.id));
  if(movieIndex===-1) return res.status(404).send('movie not found');
  movies.splice(movieIndex,1);
  fs.writeFileSync('movies.json',JSON.stringify(movies,null,2));
  res.status(204).send();
})


app.listen(PORT,()=>{
console.log("server is running on the port 3000")
})