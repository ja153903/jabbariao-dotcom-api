export interface CreatePostSchema {
	title: string
	content?: string
	published: boolean
}

export type UpdatePostSchema = Partial<CreatePostSchema>
