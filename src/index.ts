import dotenv from 'dotenv'
import Express from 'express'

import { postRouter } from '@/features/posts'

dotenv.config()

const app = Express()
const port = process.env.PORT || 3000

app.use('/api/v1/posts', postRouter)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
