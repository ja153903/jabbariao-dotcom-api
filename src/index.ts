import Express from 'express'
import dotenv from 'dotenv'

import { postRouter } from '@/features/posts'

dotenv.config()

const app = Express()
const port = process.env.PORT || 3000

app.use(postRouter)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
