import React from 'react'
import { useState, useEffect } from 'react'
import {
	Button,
	Center,
	Checkbox,
	Collapse,
	Flex,
	Input,
	Text,
	useToast,
} from '@chakra-ui/react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { dbService } from '../firebase/fbase'
import { CategoryT } from './Category'
import { Item } from './AddNewItem'

interface Props {
	categoryArr: CategoryT[]
	items: Item[]
	setCategoryArr: React.Dispatch<React.SetStateAction<CategoryT[]>>
	setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

interface SavedData {
	categories: CategoryT[]
	items: Item[]
}

export default function SaveLoad(props: Props) {
	const { categoryArr, items, setCategoryArr, setItems } = props
	const toast = useToast()
	const [saveKey, setSaveKey] = useState('')
	const [isRemember, setIsRemember] = useState(false)

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSaveKey(e.target.value)
	}

	async function saveData() {
		const saveKeySuccess = saveKeyLocalStorage()
		if (!saveKeySuccess) return

		const docRef = doc(dbService, 'saveKey', saveKey)
		const data = {
			items,
			categories: categoryArr,
		}

		await setDoc(docRef, data)
		toast({
			duration: 3000,
			render: () => (
				<Center color="white" p={3} bg="blue.500" borderRadius={'4px'}>
					<Text mr={'3px'}>저장 완료</Text>
				</Center>
			),
			position: 'bottom-left',
		})
	}

	async function loadData() {
		if (saveKey.length !== 6) {
			alert('세이브 키 6자리를 입력하세요.')
			return false
		}

		const docRef = doc(dbService, 'saveKey', saveKey)

		const res = (await getDoc(docRef)).data() as SavedData
		if (!res) {
			alert('저장된 데이터가 없습니다.')
			return
		}

		setItems(res.items)
		setCategoryArr(res.categories)

		toast({
			duration: 3000,
			render: () => (
				<Center color="white" p={3} bg="blue.500" borderRadius={'4px'}>
					<Text mr={'3px'}>불러오기 완료</Text>
				</Center>
			),
			position: 'bottom-left',
		})
	}

	function saveKeyLocalStorage() {
		if (saveKey.length !== 6) {
			alert('세이브 키 6자리를 입력하세요.')
			return false
		}
		localStorage.setItem('saveKey', saveKey)
		return true
	}

	function getSaveKey() {
		const loadedSaveKey = localStorage.getItem('saveKey')

		return loadedSaveKey
	}

	useEffect(() => {
		const key = getSaveKey()
		if (!key) return
		setSaveKey(key)
		setIsRemember(true)
	}, [])

	useEffect(() => {
		if (!isRemember) return
		loadData()
	}, [isRemember])

	return (
		<>
			<Flex
				direction={'column'}
				w={'100%'}
				border={'1px solid #d3d3d3'}
				p={'15px 20px'}
				borderRadius={'4px'}
			>
				<Flex alignItems={'center'} gap={'10px'}>
					<Input
						onChange={onChange}
						value={saveKey}
						placeholder="세이브 키 (숫자 6자리)"
						maxLength={6}
						required
						type="number"
					/>
					<Flex gap={'5px'}>
						<Button onClick={saveData} size={'xs'}>
							저장하기
						</Button>
						<Button onClick={loadData} size={'xs'}>
							불러오기
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</>
	)
}
