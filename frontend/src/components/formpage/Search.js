import React, { useState } from "react";

import Select from "react-select";

import { stateOptions } from "./data.js";

const Search = (props) => {
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedRank, setSelectedRank] = useState([]);

  const onChange = (e) => {
    const selectedValues = e.map((item) => item.value);
    const selectedRank = e.map((item) => item.rank);
    setSelectedValue(selectedValues);
    setSelectedRank(selectedRank);

    const jsonArray = selectedValues.map((item, index) => {
      return { [`key_${index}`]: item, rank: selectedRank[index] };
    });
    console.log(jsonArray);
    props.func(JSON.stringify(jsonArray));
  };

  return (
    <>
      <Select
        options={stateOptions}
        isMulti
        className="basic-multi-select"
        classNamePrefix="select"
        name="usernames"
        onChange={onChange}
      />
      {selectedValue.map((ok, index) => (
        <p key={index}>{ok}</p>
      ))}
    </>
  );
};

export default Search;
