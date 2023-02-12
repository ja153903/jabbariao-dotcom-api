import { Router } from 'express'
import type { Request, Response } from 'express'

import type { RequestParamsWithId } from '@/types/api'

import type { CreatePostSchema, UpdatePostSchema } from './schema'
import {
	createPost,
	deletePost,
	getPosts,
	getPostById,
	updatePost,
} from './service'

const router = Router()

interface GetPostsRequestQuery {
	limit?: number
}

type GetPostsRequest = Request<unknown, unknown, unknown, GetPostsRequestQuery>

router.get('/', async (req: GetPostsRequest, res: Response) => {
	const { limit = null } = req.query

	try {
		const posts = await getPosts(limit)
		res.status(200).send({
			data: { posts },
		})
	} catch {
		res.status(404).send({
			error: {
				message: 'Could not get posts',
			},
		})
	}
})

type CreatePostRequest = Request<unknown, unknown, CreatePostSchema, unknown>

router.post('/', async (req: CreatePostRequest, res: Response) => {
	const post = req.body

	try {
		const newPost = await createPost(post)
		res.status(200).send({
			data: {
				post: newPost,
			},
		})
	} catch {
		res.status(400).send({
			error: {
				message: 'Could not create post',
			},
		})
	}
})

type GetPostByIdRequest = Request<
	RequestParamsWithId,
	unknown,
	unknown,
	unknown
>

router.get('/:id', async (req: GetPostByIdRequest, res: Response) => {
	const { id } = req.params

	try {
		const post = await getPostById(id)
		res.status(200).send({
			data: { post },
		})
	} catch {
		res.status(404).send({
			error: {
				message: `Cannot fetch post with id ${id}`,
			},
		})
	}
})

type DeletePostByIdRequest = GetPostByIdRequest

router.delete('/:id', async (req: DeletePostByIdRequest, res: Response) => {
	const { id } = req.params

	try {
		const post = await deletePost(id)
		res.status(200).send({
			data: {
				post,
				message: `Post with id ${id} deleted successfully`,
			},
		})
	} catch {
		res.status(404).send({
			error: {
				message: `Cannot delete post with id ${id}`,
			},
		})
	}
})

type UpdatePostRequest = Request<
	RequestParamsWithId,
	unknown,
	UpdatePostSchema,
	unknown
>

router.put('/:id', async (req: UpdatePostRequest, res: Response) => {
	const { id } = req.params
	const post = req.body

	try {
		const updatedPost = await updatePost(id, post)
		res.status(200).send({
			data: {
				post: updatedPost,
			},
		})
	} catch {
		res.status(404).send({
			error: {
				message: `Cannot update post with id ${id}`,
			},
		})
	}
})

export default router
