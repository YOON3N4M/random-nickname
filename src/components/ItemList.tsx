import React from 'react'
import { Item } from './AddNewItem'

interface Props {
	items: Item[]
}

export default function ItemList(props: Props) {
	const { items } = props

	return <div>ItemList</div>
}
