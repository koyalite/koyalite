import express from "express";
import routes from "./routes";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use("/auth", routes);

app.listen(port, () => {
    console.log(`[auth] service listening on http://localhost:${port}`);
});
