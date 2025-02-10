import { useEffect, useRef, useState } from "react";
import styles from "./SearchInput.module.css"

type SearchInputProps = {
    searchKeyword: string;
    onChangeSearchKeyword: (e: string) => void;
};

const SearchInput = ({searchKeyword, onChangeSearchKeyword}: SearchInputProps) => {

    const [value, setValue] = useState("");
    const typingTimeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        setValue(searchKeyword);
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const onUserTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        const value = e.target.value;
        typingTimeoutRef.current = setTimeout(() => {
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
            <input data-testid="search-input" className={styles.input} value={value} type="text" name="" id="" placeholder="search..." onChange={onUserTyping}/>
        </div>
    )
}

export default SearchInput