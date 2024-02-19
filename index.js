import express from 'express'

const app = express();
const port = 3001;

app.get('/',(req,res) => {
    const file = '<h1>Hello!</h1>'
    res.send(file)
})

app.listen(port,() => {
    console.log(`Server listening on port ${port}`);
})