type IdType = 'item' | 'category'

export function generateId(type: IdType) {
	return `${type}-${new Date().getTime()}`
}

//
