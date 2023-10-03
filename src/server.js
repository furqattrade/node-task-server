const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const app = require("./app");
dotenv.config();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
    server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
    process.on("unhandledRejection", (err) => {
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => console.error(err));
