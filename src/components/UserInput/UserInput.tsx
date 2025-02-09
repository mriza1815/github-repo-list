import styles from './UserInput.module.css'

interface UserInputProps {
    name: string,
    type: string,
    value: string,
    autoComplete: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const UserInput = ({name, type, autoComplete, value, onChange}: UserInputProps) => {
    
    return (
        <input
            id="email"
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required
            autoComplete={autoComplete}
            className={`${styles.input} outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600`}
        />
    )
}

export default UserInput