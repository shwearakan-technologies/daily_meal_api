require("dotenv").config();

const app = require("./app");

// database connection and server start
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, host, () => {
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Server is running at http://${host}:${port}`);
});
