import { FormLabel, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

export interface Item {
	id: number
	body: string
	categoryId: number
}

interface Props {
	setItems: React.Dispatch<React.SetStateAction<Item[]>>
	selectedCategory: number | undefined
}

export default function AddNewItem(props: Props) {
	const { setItems, selectedCategory } = props

	const [itemBody, setItemBody] = useState('')

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setItemBody(e.target.value)
	}

	function createNewItem(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (selectedCategory === undefined) {
			alert('선택된 카테고리가 없습니다.')
			return
		}

		const newItem: Item = {
			id: 0,
			body: itemBody,
			categoryId: selectedCategory,
		}
	}

	return (
		<VStack
			w={'100%'}
			border={'1px solid #d3d3d3'}
			p={'15px 20px'}
			borderRadius={'4px'}
		>
			<form onSubmit={createNewItem} style={{ width: '100%' }}>
				<FormLabel>단어 추가</FormLabel>
				<Input
					value={itemBody}
					onChange={onChange}
					placeholder="추가할 단어를 입력하세요."
					required
				></Input>
			</form>
		</VStack>
	)
}
