/** This is necessary for Node to pick up path aliases */
import 'module-alias/register'

/** Initialize environment variables */
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

import { postRouter } from '@/features/posts'

const app = express()
const port = process.env.PORT || 3000

/** Middleware */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/** API Routers */
app.use('/api/v1/posts', postRouter)

/** Listen on Port */
app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
