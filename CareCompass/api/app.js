import express from "express";
import cors from "cors";
import postRoute from "./routes/post.route.js"
import authRoute from "./routes/auth.route.js"
import testRoute from "./routes/test.route.js"
import userRoute from "./routes/user.route.js"
import googledataRoute from "./routes/googledata.route.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/users",userRoute);
app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/googledata", googledataRoute)

app.listen(5100, () => {
    console.log("Server is readyt");
});
