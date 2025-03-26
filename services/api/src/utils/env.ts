import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });

export const env = {
    port: process.env.PORT || "3000",
    nodeEnv: process.env.NODE_ENV || "development",
};
