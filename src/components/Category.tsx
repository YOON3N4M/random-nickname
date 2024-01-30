import {
	Box,
	Button,
	Collapse,
	Flex,
	FormLabel,
	Input,
	Select,
	VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { generateId } from '../utils'

export interface CategoryT {
	id: string
	name: string
}

interface Props {
	categories: CategoryT[]
	setCategoryArr: React.Dispatch<React.SetStateAction<CategoryT[]>>
	setSelectedCategory: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function Category(props: Props) {
	const { categories, setCategoryArr, setSelectedCategory } = props
	const [isAdd, setIsAdd] = useState(false)
	const [newCategoryName, setNewCategoryName] = useState('')

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setNewCategoryName(e.target.value)
	}

	function createNewCategory(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const newCategory: CategoryT = {
			id: generateId('category'),
			name: newCategoryName,
		}

		setNewCategoryName('')
		setCategoryArr((prev) => [...prev, newCategory])
		setIsAdd(false)
	}

	function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
		setSelectedCategory(e.target.value)
		console.log(typeof e.target.value)
	}

	return (
		<>
			<VStack
				w={'100%'}
				border={'1px solid #d3d3d3'}
				p={'15px 20px'}
				borderRadius={'4px'}
			>
				<Flex w={'100%'} alignItems={'center'} justifyContent={'space-between'}>
					<FormLabel margin={'0px'}>카테고리</FormLabel>
					<Button
						size={'xs'}
						onClick={() => {
							setIsAdd((prev) => !prev)
						}}
					>
						+
					</Button>
				</Flex>
				<Collapse in={isAdd} animateOpacity>
					<form onSubmit={createNewCategory}>
						<Flex gap={'10px'}>
							<Input
								value={newCategoryName}
								onChange={onChange}
								placeholder="새 카테고리 이름"
								required
							/>
							<Button type="submit">추가</Button>
						</Flex>
					</form>
				</Collapse>
				{!isAdd && (
					<Select onChange={onSelectChange} placeholder="카테고리를 선택하세요">
						{categories.map((category) => (
							<option key={category.id} value={category.id}>
								{category.name}
							</option>
						))}
					</Select>
				)}
			</VStack>
		</>
	)
}
