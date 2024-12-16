import {
  Button,
  Center,
  Checkbox,
  Flex,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddNewItemContainer, { Item } from "./components/AddNewItemContainer";
import CategoryContainer from "./components/CategoryContainer";
import SaveLoadContainer from "./components/SaveLoadContainer";
import { Category } from "./types";
import ItemListContainer from "./components/ItemListContainer";

function App() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [randomCount, setRandomCount] = useState(1);
  const [allowExist, setAllowExist] = useState(false);
  const [itemList, setItemList] = useState<Item[]>([]);

  const toast = useToast();

  function getRandomItem() {
    const filterd = itemList.filter(
      (item) => item.categoryId === selectedCategory
    );
    const randomResult: Item[] = [];

    if (filterd.length < 1) {
      alert("아이템이 없습니다.");
      return;
    }

    if (randomCount > filterd.length) {
      alert("한번에 뽑으려는 아이템의 개수가 전체 개수 보다 많습니다.");
      return;
    }

    if (allowExist) {
      for (let i = 0; i < randomCount; i++) {
        const randomNum = Math.floor(Math.random() * filterd.length);
        randomResult.push(filterd[randomNum]);
      }
    } else {
      while (randomResult.length < randomCount) {
        const randomNum = Math.floor(Math.random() * filterd.length);
        const randomNickname = filterd[randomNum];

        // 중복 체크
        if (!randomResult.includes(randomNickname)) {
          randomResult.push(randomNickname);
        }
      }
    }

    toast({
      duration: 10000,
      render: () => (
        <Center color="white" p={3} bg="blue.500" borderRadius={"4px"}>
          {randomResult.map((item) => (
            <Text mr={"3px"}>{item.body}</Text>
          ))}
        </Center>
      ),
    });
  }

  useEffect(() => {
    console.log(categoryList);
  }, [categoryList]);
  return (
    <div className="App">
      <Flex pt={"100px"}>
        <Flex h="100vh" m={"0 auto"}>
          <VStack maxW={"500px"} borderRadius={"4px"}>
            <Text fontSize={"12px"} color={"gray.700"}>
              이용 후 저장하지 않으면 마지막 저장이후 데이터가 초기화 됩니다.
            </Text>
            <Text fontSize={"12px"} color={"gray.700"}>
              저장시 입력한 세이브키는 이후 자동으로 저장 됩니다.
            </Text>
            <SaveLoadContainer
              itemList={itemList}
              categoryList={categoryList}
              setCategoryList={setCategoryList}
              setItemList={setItemList}
            />
            <CategoryContainer
              categoryList={categoryList}
              setCategoryList={setCategoryList}
              setSelectedCategory={setSelectedCategory}
            />

            <AddNewItemContainer
              setItemList={setItemList}
              selectedCategory={selectedCategory}
            />
            <HStack
              w={"100%"}
              alignItems={"center"}
              boxSizing={"border-box"}
              p={"0 10px"}
              justifyContent={"center"}
            >
              <Button w={"58%"} colorScheme={"green"} onClick={getRandomItem}>
                랜덤 뽑기
              </Button>
              <NumberInput
                defaultValue={randomCount}
                min={1}
                //max={nicknameArr.length}
                w={"20%"}
                onChange={(value) => setRandomCount(Number(value))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Checkbox
                colorScheme="green"
                onChange={() => setAllowExist((prev) => !prev)}
              >
                중복허용
              </Checkbox>
            </HStack>
            <ItemListContainer
              itemList={itemList}
              setItemList={setItemList}
              selectedCategory={selectedCategory}
            />
          </VStack>
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
