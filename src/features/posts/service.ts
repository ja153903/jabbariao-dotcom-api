import { prisma } from '@/lib/db'

import type { CreatePostSchema, UpdatePostSchema } from './schema'

const GET_POST_SELECT_FIELDS = {
	select: {
		id: true,
		title: true,
		createdAt: true,
		updatedAt: true,
		published: true,
	},
}

async function getPosts(limit: number | null = null) {
	if (limit === null) {
		return prisma.post.findMany({ ...GET_POST_SELECT_FIELDS })
	}

	return await prisma.post.findMany({
		...GET_POST_SELECT_FIELDS,
		take: limit,
	})
}

async function getPostById(id: number) {
	return await prisma.post.findUnique({
		where: {
			id,
		},
	})
}

async function createPost(post: CreatePostSchema) {
	return await prisma.post.create({
		data: post,
	})
}

async function deletePost(id: number) {
	return await prisma.post.delete({
		where: { id },
	})
}

async function updatePost(id: number, data: UpdatePostSchema) {
	return await prisma.post.update({
		where: { id },
		data,
	})
}

export { createPost, deletePost, getPosts, getPostById, updatePost }
