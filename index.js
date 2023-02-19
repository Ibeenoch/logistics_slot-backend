import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './route/logistic.js'
import { Server } from 'socket.io'
import http from 'http'

dotenv.config()

const app = express()
const server = http.createServer(app);
export const io = new Server(server);
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/', router)

  // Start the server
  app.listen(3030, () => {
  console.log('Server started on port 3000');
  });