import { useEffect, useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VFlexBox = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  const [inputValue, setInputValue] = useState("");
  const [nicknameArr, setNicknameArr] = useState([]);
  const [selectedNickname, setSelectedNickname] = useState("");

  function onChangeInput(event) {
    setInputValue(event.target.value);
  }

  function getNickname() {
    const data = localStorage.getItem("nickname");
    if (data === null) return;
    console.log(data);
    setNicknameArr(JSON.parse(data));
  }

  function onSubmit(event) {
    event.preventDefault();
    setNicknameArr((prev) => [...prev, inputValue]);
    localStorage.setItem("nickname", JSON.stringify(nicknameArr));
  }

  function random() {
    if (nicknameArr.length > 0) {
      const randomNum = Math.floor(Math.random() * (nicknameArr.length - 0));
      console.log(randomNum);
      alert(`${nicknameArr[randomNum]}`);
    } else {
      alert("저장된 닉네임이 없음");
    }
  }

  useEffect(() => {
    getNickname();
  }, []);

  useEffect(() => {
    setInputValue("");
  }, [nicknameArr]);
  return (
    <div className="App">
      <Container>
        <div>
          <VFlexBox>
            <form onSubmit={onSubmit}>
              <label>닉네임을 입력해주세요.</label>
              <input onChange={onChangeInput} value={inputValue}></input>
            </form>
            <button onClick={random}>뽑기!</button>
            {nicknameArr.length > 0 &&
              nicknameArr.map((nick) => <span>{nick}</span>)}
          </VFlexBox>
        </div>
      </Container>
    </div>
  );
}

export default App;
