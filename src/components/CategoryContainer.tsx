import {
  Box,
  Button,
  Collapse,
  Flex,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { generateId } from "../utils";
import { Category } from "../types";

interface Props {
  categoryList: Category[];
  setCategoryList: React.Dispatch<React.SetStateAction<Category[]>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function CategoryContainer(props: Props) {
  const { categoryList, setCategoryList, setSelectedCategory } = props;
  const [isAddMode, setIsAddMode] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  function createNewCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newCategory: Category = {
      id: generateId("category"),
      name: newCategoryName,
    };

    setNewCategoryName("");
    setCategoryList((prev) => [...prev, newCategory]);
    setIsAddMode(false);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewCategoryName(e.target.value);
  }

  function onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(e.target.value);
    console.log(typeof e.target.value);
  }

  return (
    <>
      <VStack
        w={"100%"}
        border={"1px solid #d3d3d3"}
        p={"15px 20px"}
        borderRadius={"4px"}
      >
        <Flex w={"100%"} alignItems={"center"} justifyContent={"space-between"}>
          <FormLabel margin={"0px"}>카테고리</FormLabel>
          <Button
            size={"xs"}
            onClick={() => {
              setIsAddMode((prev) => !prev);
            }}
          >
            +
          </Button>
        </Flex>
        <Collapse in={isAddMode} animateOpacity>
          <form onSubmit={createNewCategory}>
            <Flex gap={"10px"}>
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
        {!isAddMode && (
          <Select onChange={onSelectChange} placeholder="카테고리를 선택하세요">
            {categoryList.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        )}
      </VStack>
    </>
  );
}
