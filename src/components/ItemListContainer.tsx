import React from "react";
import { Item } from "./AddNewItemContainer";
import { Badge, Flex, HStack, Heading, VStack, Text } from "@chakra-ui/react";

interface Props {
  itemList: Item[];
  selectedCategory: string | undefined;
  setItemList: React.Dispatch<React.SetStateAction<Item[]>>;
}

export default function ItemListContainer(props: Props) {
  const { itemList, selectedCategory, setItemList } = props;

  function deleteItem(id: string) {
    const filterdItems = itemList.filter((item) => item.id !== id);
    setItemList(filterdItems);
  }

  function FilterByCategory() {
    const filterdItems = itemList.filter(
      (item) => item.categoryId === selectedCategory
    );

    return (
      <>
        <Text color={"gray"}>{filterdItems.length} 개</Text>
        <Flex
          gap={"10px"}
          flexWrap={"wrap"}
          w={"100%"}
          //justifyContent={'center'}
        >
          {filterdItems.map((item) => (
            <Badge
              key={item.id}
              cursor={"pointer"}
              onClick={() => deleteItem(item.id)}
            >
              {item.body}
            </Badge>
          ))}
        </Flex>
      </>
    );
  }

  return (
    <VStack
      flexWrap={"wrap"}
      w={"100%"}
      border={"1px solid #d3d3d3"}
      p={"15px 20px"}
      borderRadius={"4px"}
    >
      <FilterByCategory />
    </VStack>
  );
}
