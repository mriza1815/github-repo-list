import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import styles from "./SearchInput.module.css"

type SearchInputProps = {
    onChangeSearchKeyword: (e: string) => void;
};
let typingTimeout: any;

const SearchInput = ({onChangeSearchKeyword}: SearchInputProps) => {

    const searchKeyword = useAppSelector((state) => state.table.searchKeyword)
    const [initialValue, setInitialValue] = useState("");

    useEffect(() => {
        setInitialValue(searchKeyword);
    }, [])
    
    const onUserTyping = (e: any) => {
        clearTimeout(typingTimeout);
        const value = e.target.value;
        typingTimeout = setTimeout(() => {
            onChangeSearchKeyword(value);
        }, 800);
      };
    
      return (
        <div className={styles.container}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
            fill="currentColor">
            <path fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd" />
            </svg>
            <input className={styles.input} defaultValue={initialValue} type="text" name="" id="" placeholder="search..." onChange={onUserTyping}/>
        </div>
    )
}

export default SearchInput