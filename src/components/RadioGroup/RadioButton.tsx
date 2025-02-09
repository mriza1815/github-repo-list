import styles from "./RadioButton.module.css"

interface RadioButtonProps {
    name: string;
    value: string;
    selectedLang: string;
    onSelectedLang: (e: React.ChangeEvent<HTMLInputElement>) => void,
    defaultChecked?: boolean;
}

const RadioButton = ({value, selectedLang, onSelectedLang, name}: RadioButtonProps) => {
    return (
        <div className={styles.container}>
            <input 
                id="red-radio" 
                type="radio"
                className={styles.radioInput}
                value={value}
                checked={selectedLang === value}
                onChange={onSelectedLang} 
                name={name} 
            />
            <label htmlFor="red-radio" className={styles.inputLabel}>{value}</label>
        </div>
    )
}

export default RadioButton