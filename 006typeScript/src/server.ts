import app from './app';
const port = 3000;

app.listen(port||3000, process.env.IP, ()=>{
    console.log(`express start Listening on port ${port}`);
    console.log("http://localhost:3000");
})