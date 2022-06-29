import { Input } from "antd";
import React, { useState } from "react";

const { Search } = Input;

function SearchFeature(props) {
  const [SearchTerm, setSearchTerm] = useState("");

  const searchHandler = (event) => {
    setSearchTerm(event.currentTarget.value);

    //부모로 전달해서 업데이트
    props.refreshFunction(event.currentTarget.value);
  };

  return (
    <div>
      <Search
        placeholder="input search text"
        onChange={searchHandler}
        style={{ width: 200 }}
        value={SearchTerm}
      />
    </div>
  );
}

export default SearchFeature;
