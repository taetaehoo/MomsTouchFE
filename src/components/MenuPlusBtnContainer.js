import React, {useEffect, useState} from 'react';
import styles from '../styles/MenuPlusBtnContainer.module.css'



const MenuPlusBtnContainer = ({menu}) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(menu.optionGroupList);
    }, [])
    return (
        <ul className={styles.DivUl}>
            {options && options.map(option => {
                return <li className={styles.DivLi}><p>{option.name}
                    <select>
                        {option.optionList.map(op => {
                            return <option><p>{op.name}</p> <p>{op.price}</p></option>
                        })}
                    </select>
                </p></li>
            })}
        </ul>
    );
};

export default MenuPlusBtnContainer;