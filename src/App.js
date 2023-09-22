import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import AddModal from "./AddModal";

function App() {
  const [nickname, setNickname] = useState("");
  const [nicknameArr, setNicknameArr] = useState([]);
  const [categoryArr, setCategoryArr] = useState([]);
  const [selectedNickname, setSelectedNickname] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOn, setIsModalOn] = useState(false);
  const toast = useToast();

  function onChangeInput(event) {
    setNickname(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    localStorage.setItem(
      selectedCategory,
      JSON.stringify([...nicknameArr, nickname])
    );
    setNicknameArr((prev) => [...prev, nickname]);
  }

  function onWordClick() {}

  function random() {
    if (nicknameArr.length > 0) {
      const randomNum = Math.floor(Math.random() * (nicknameArr.length - 0));
      console.log(randomNum);
      ///  alert(`${nicknameArr[randomNum]}`);

      toast({
        duration: 3000,
        render: () => (
          <Center color="white" p={3} bg="blue.500" borderRadius={"4px"}>
            {nicknameArr[randomNum]}
          </Center>
        ),
      });
    } else {
      toast({
        duration: 3000,
        render: () => (
          <Center color="white" p={3} bg="red.500">
            저장된 닉네임이 없습니다.
          </Center>
        ),
      });
    }
  }

  function resetCategory() {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      localStorage.removeItem(selectedCategory);
      const filtered = categoryArr.filter(
        (category) => category !== selectedCategory
      );
      setCategoryArr(filtered);
      setNicknameArr([]);
    } else {
      return;
    }
  }

  function getData() {
    //스토리지 키 불러오기
    const localLength = localStorage.length;
    let localKeyArr = [];

    for (let i = 0; i < localLength; i++) {
      const key = localStorage.key(i);
      if (key !== "chakra-ui-color-mode") {
        localKeyArr.push(key);
      }
      setCategoryArr(localKeyArr);
      if (localKeyArr.length < 0) return;
      setSelectedCategory(localKeyArr[0]);
    }
  }

  function getNicknameByKey() {
    const data = localStorage.getItem(selectedCategory);

    if (data === null || data === "" || data.length === 0) {
      setNicknameArr([]);
    } else {
      setNicknameArr(JSON.parse(data));
    }
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
    const data = localStorage.getItem(selectedCategory);
    //  console.log(typeof JSON.stringify(data));
    if (data === null || data === "") return;
    //setNicknameArr(data);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setNickname("");
  }, [nicknameArr]);

  useEffect(() => {
    getNicknameByKey();
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory === "") return;
    setSelectedCategory(categoryArr[0]);
  }, []);

  // 여러 카테고리가 존재하다 삭제를 통해 1개의 카테고리만 남았을때
  useEffect(() => {
    if (categoryArr.length === 1) {
      setSelectedCategory(categoryArr[0]);
    } else if (categoryArr.length > 1) {
      setSelectedCategory(categoryArr[0]);
    }
  }, [categoryArr]);

  return (
    <div className="App">
      <AddModal
        isModalOn={isModalOn}
        setIsModalOn={setIsModalOn}
        setCategoryArr={setCategoryArr}
        setSelectedCategory={setSelectedCategory}
      />
      <Flex pt={"100px"}>
        <Flex h="100vh" m={"0 auto"}>
          <VStack w={"500px"} borderRadius={"4px"}>
            <Text fontSize={"12px"} color={"gray.700"}>
              주의사항 : 인터넷 검색기록, 쿠키 등을 삭제하면 데이터가 초기화
              됩니다.
            </Text>
            <VStack
              w={"100%"}
              border={"1px solid #d3d3d3"}
              p={"15px 20px"}
              borderRadius={"4px"}
            >
              <Flex
                w={"100%"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <FormLabel margin={"0px"}>카테고리</FormLabel>
                <Button size={"xs"} onClick={() => setIsModalOn(true)}>
                  +
                </Button>
              </Flex>
              <Select onChange={handleCategoryChange}>
                {categoryArr.length > 0 ? (
                  categoryArr.map((category) => (
                    <option value={category}>{category}</option>
                  ))
                ) : (
                  <option>카테고리가 없습니다.</option>
                )}
              </Select>
              <Button w={"100%"} colorScheme={"red"} onClick={resetCategory}>
                선택한 카테고리 삭제
              </Button>
            </VStack>
            {categoryArr.length !== 0 && (
              <VStack
                w={"100%"}
                border={"1px solid #d3d3d3"}
                p={"15px 20px"}
                borderRadius={"4px"}
              >
                <form onSubmit={onSubmit} style={{ width: "100%" }}>
                  <FormLabel>단어 추가</FormLabel>
                  <Input
                    value={nickname}
                    onChange={onChangeInput}
                    placeholder="추가할 단어를 입력하세요."
                    required
                  ></Input>
                </form>
              </VStack>
            )}
            {nicknameArr.length !== 0 && (
              <>
                <Button
                  mt={"30px"}
                  w={"100%"}
                  colorScheme={"green"}
                  onClick={random}
                >
                  랜덤 뽑기
                </Button>
                <VStack
                  border={"1px solid #d3d3d3"}
                  p={"15px 20px"}
                  borderRadius={"4px"}
                  w={"100%"}
                >
                  <Text fontSize={"sm"}>{nicknameArr.length}개</Text>
                  <HStack flexWrap={"wrap"} w={"100%"}>
                    {nicknameArr.length !== 0 &&
                      nicknameArr.map((nick) => <Badge>{nick}</Badge>)}
                  </HStack>
                </VStack>
              </>
            )}
          </VStack>
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
