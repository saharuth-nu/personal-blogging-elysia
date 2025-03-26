import { Elysia } from "elysia";
import { articleRoute } from "./routes/articleRoute";

import "./utils/db";

require('dotenv').config()

const app = new Elysia()
const port = process.env.SERVER_PORT === undefined? 3000: Number(process.env.SERVER_PORT)

app.get("/", () => "Hello Elysia");

app.group('/api/v1/articles', (app) => app.use(articleRoute))

app.listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
