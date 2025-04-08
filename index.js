import express from "express";
import { funcDocs, taxBudgetCalc } from "./controllers/taxBudgetCalc.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Function
app.post("/api/v1/functions/tax-calculator", taxBudgetCalc);

//Docs
app.get("/api/v1/functions/tax-calculator", funcDocs);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
