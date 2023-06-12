import React, { useState } from "react";

const OptionInput = () => {
    const [options, setOptions] = useState([
        { option: "", optionPrice: "" }
    ]);

    const handleChange = (i, e) => {
        const values = [...options];
        values[i][e.target.name] = e.target.value;
        setOptions(values);
    };

    const handleAdd = () => {
        const values = [...options];
        values.push({ option: "", optionPrice: "" });
        setOptions(values);
    };

    const handleRemove = (i) => {
        const values = [...options];
        values.splice(i, 1);
        setOptions(values);
    };

    return (
        <div>
            {options.map((option, idx) => (
                <div key={idx}>
                    <select
                        name="optionGroup"
                        value={option.optionGroup}
                        onChange={e => handleChange(idx, e)}
                    >
                        <option value="">--옵션 그룹 선택--</option>
                        <option value="사이드 선택">사이드 선택</option>
                        <option value="음료 선택">음료 선택</option>
                        {/* 추가적으로 필요한 옵션 그룹들 */}
                    </select>
                    <input
                        type="text"
                        name="option"
                        placeholder="옵션"
                        value={option.option}
                        onChange={e => handleChange(idx, e)}
                    />
                    <input
                        type="text"
                        name="optionPrice"
                        placeholder="옵션 가격"
                        value={option.optionPrice}
                        onChange={e => handleChange(idx, e)}
                    />
                    {options.length !== 1 && (
                        <button onClick={() => handleRemove(idx)}>-</button>
                    )}
                    {options.length - 1 === idx && <button onClick={handleAdd}>+</button>}
                </div>
            ))}
        </div>
    );
};

export default OptionInput;
