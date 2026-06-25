import express from 'express';
import morgan from 'morgan';
const app = express();
app.use(express.static('public'));


app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.send('Hello World!');
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];
  res.status(200).json(users);
});

app.get("*name", (req, res) => {
  res.sendFile('public/index.html', { root: __dirname });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});