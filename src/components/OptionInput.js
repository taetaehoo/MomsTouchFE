import React, {useEffect, useState} from "react";

const OptionInput = ({ handleOptionGroupList }) => {
    const [optionGroups, setOptionGroups] = useState([
        { groupName: "", options: [{ option: "", optionPrice: "" }] }
    ]);

    const handleGroupNameChange = (i, e) => {
        const newGroups = [...optionGroups];
        newGroups[i].groupName = e.target.value;
        setOptionGroups(newGroups);
    };

    const handleOptionChange = (i, j, e) => {
        const newGroups = [...optionGroups];
        newGroups[i].options[j][e.target.name] = e.target.value;
        setOptionGroups(newGroups);
    };

    useEffect(() => {
        handleOptionGroupList(optionGroups);
    }, [optionGroups, handleOptionGroupList]);

    const handleOptionAdd = (i) => {
        const newGroups = [...optionGroups];
        newGroups[i].options.push({ option: "", optionPrice: "" });
        setOptionGroups(newGroups);
    };

    const handleOptionRemove = (i, j) => {
        const newGroups = [...optionGroups];
        newGroups[i].options.splice(j, 1);
        setOptionGroups(newGroups);
    };

    const handleOptionGroupAdd = () => {
        setOptionGroups(prevGroups => [...prevGroups, { groupName: "", options: [{ option: "", optionPrice: "" }] }]);
    };

    const handleOptionGroupRemove = (i) => {
        const newGroups = [...optionGroups];
        newGroups.splice(i, 1);
        setOptionGroups(newGroups);
    };

    return (
        <div>
            {optionGroups.map((group, i) => (
                <div key={i}>
                    <select
                        name="groupName"
                        value={group.groupName}
                        onChange={e => handleGroupNameChange(i, e)}
                    >
                        <option value="">--옵션 그룹 선택--</option>
                        <option value="단품/세트 선택">단품/세트 선택</option>
                        <option value="사이드 선택">사이드 선택</option>
                        {/* 추가적으로 필요한 옵션 그룹들 */}
                    </select>
                    {group.options.map((option, j) => (
                        <div key={j}>
                            <input
                                type="text"
                                name="option"
                                placeholder="옵션"
                                value={option.option}
                                onChange={e => handleOptionChange(i, j, e)}
                            />
                            <input
                                type="text"
                                name="optionPrice"
                                placeholder="옵션 가격"
                                value={option.optionPrice}
                                onChange={e => handleOptionChange(i, j, e)}
                            />
                            {group.options.length !== 1 && (
                                <button onClick={() => handleOptionRemove(i, j)}>-</button>
                            )}
                            {group.options.length - 1 === j && (
                                <button onClick={() => handleOptionAdd(i)}>+</button>
                            )}
                        </div>
                    ))}
                    {optionGroups.length !== 1 && (
                        <button onClick={() => handleOptionGroupRemove(i)}>그룹 삭제</button>
                    )}
                    {optionGroups.length - 1 === i && (
                        <button onClick={handleOptionGroupAdd}>그룹 추가</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default OptionInput;
