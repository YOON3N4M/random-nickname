import {
	Badge,
	Box,
	Button,
	Center,
	Checkbox,
	Flex,
	FormLabel,
	HStack,
	Input,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
	Text,
	useToast,
	VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Category, { CategoryT } from './components/Category'
import AddNewItem, { Item } from './components/AddNewItem'
import ItemList from './components/ItemList'

function App() {
	const [categoryArr, setCategoryArr] = useState<CategoryT[]>([])
	const [selectedCategory, setSelectedCategory] = useState<string>()

	const [items, setItems] = useState<Item[]>([])

	const toast = useToast()

	return (
		<div className="App">
			<Flex pt={'100px'}>
				<Flex h="100vh" m={'0 auto'}>
					<VStack w={'500px'} borderRadius={'4px'}>
						<Text fontSize={'12px'} color={'gray.700'}>
							이용 후 저장하지 않으면 모든 데이터가 초기화 됩니다.
						</Text>
						<Category
							categories={categoryArr}
							setCategoryArr={setCategoryArr}
							setSelectedCategory={setSelectedCategory}
						/>

						<AddNewItem
							setItems={setItems}
							selectedCategory={selectedCategory}
						/>

						<ItemList items={items} />

						{/* {nicknameArr.length !== 0 && (
							<>
								<HStack
									w={'100%'}
									alignItems={'center'}
									boxSizing={'border-box'}
									p={'0 10px'}
									justifyContent={'center'}
								>
									<Button w={'58%'} colorScheme={'green'} onClick={random}>
										랜덤 뽑기
									</Button>
									<NumberInput
										defaultValue={randomCount}
										min={1}
										max={nicknameArr.length}
										w={'20%'}
										onChange={(value) => setRandomCount(value)}
									>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
									<Checkbox
										colorScheme="green"
										onChange={() => setCanExist((prev) => !prev)}
									>
										중복허용
									</Checkbox>
								</HStack>
								<VStack
									border={'1px solid #d3d3d3'}
									p={'15px 20px'}
									borderRadius={'4px'}
									w={'100%'}
								>
									<Text fontSize={'sm'}>{nicknameArr.length}개</Text>
									<HStack flexWrap={'wrap'} w={'100%'}>
										{nicknameArr.length > 0 &&
											nicknameArr.map((nick) => (
												<Badge
													cursor={'pointer'}
													onClick={() => onWordClick(nick)}
												>
													{nick}
												</Badge>
											))}
									</HStack>
								</VStack>
							</>
						)} */}
					</VStack>
				</Flex>
			</Flex>
		</div>
	)
}

export default App
