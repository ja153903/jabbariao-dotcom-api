import dotenv from 'dotenv'
import express from 'express'

import { postRouter } from '@/features/posts'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/posts', postRouter)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
