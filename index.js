import express from "express";
import "dotenv/config";
import router from "./routes/quote.js";

const app = express();

app.use(express.static("public")); // serve index.html from here
app.use("/api/quote", router); /**
 * “For any request that starts with /api/quote, go use the routes inside quote.js.”
🔎 Example:
Going to http://localhost:1212/api/quote will go to your GET / route inside quote.js.
 */

// set port
const PORT = process.env.PORT || 1212; 

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
