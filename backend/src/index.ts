import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config";
import { bookRouter } from './books/bookrouter';
import { cors } from 'hono/cors';


const app = new Hono();

app.use("*", 
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  }
));

app.get('/api', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', bookRouter)


serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000,
});
console.log(`Server is running on port ${process.env.PORT}`);
