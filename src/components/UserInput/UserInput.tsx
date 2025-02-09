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
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
    )
}

export default UserInput