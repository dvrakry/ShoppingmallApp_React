import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";
const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    //누른것의 INDEX를 구하고

    const currentIndex = Checked.indexOf(value);

    //전체 CHECKED 된 STATE 에서 현재 누른 CheckBox가 있다면

    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      // 빼주고
      newChecked.splice(currentIndex, 1);
    }
    //STATE 를 넣어준다
    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckBoxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));
  return (
    <Collapse defaultActiveKey={["0"]}>
      <Panel header="Continent" key="1">
        {renderCheckBoxLists()}
      </Panel>
    </Collapse>
  );
}

export default CheckBox;
