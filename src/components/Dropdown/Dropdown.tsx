import { useRef, useState } from "react";
import { SortProps } from "../../types";
import styles from "./Dropdown.module.css"
import useOutsideClick from "../../hooks/useOutsideClick";

type DropdownProps = {
    list: { value: SortProps; name: string }[];
    onSelectItem: (e: SortProps) => void,
    sortBy: string
};

const Dropdown = ({list, onSelectItem, sortBy}: DropdownProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLButtonElement>(null)
    useOutsideClick(menuRef, () => {setIsOpen(false)});

    const toggleOpen = () => {
        setIsOpen(prev => !prev)
    }
    
    return (
        <div className={styles.container}>
            <div>
                <button 
                    type="button"
                    ref={menuRef}
                    onClick={toggleOpen}
                    className={styles.menuButton}
                    data-testid="menu-button"
                    id="menu-button" 
                    aria-expanded="true" 
                    aria-haspopup="true"
                >
                Sort By
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
                </button>
            </div>
            <div 
                id="menu"
                data-testid="menu-div"
                data-testOpen={isOpen}
                className={`${styles.menu} ${isOpen ? styles.isOpen : ""}`} 
                role="menu" 
                aria-orientation="vertical" 
                aria-labelledby="menu-button" 
                tabIndex={-1}
            >
                <div className="py-1" role="none" data-testid="menu-item-list">
                    {list.map((item, key) => (
                        <button
                            key={`dropdown-item-${key}`}
                            onClick={() => onSelectItem(item.value as SortProps)} 
                            data-testActive={item.value === sortBy}
                            className={`${styles.menuItem} ${item.value === sortBy ? styles.active : ""}`}
                            role="menuitem" 
                            tabIndex={-1} 
                            id="menu-item-0">{item.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dropdown