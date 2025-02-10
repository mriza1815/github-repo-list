import styles from "./ErrorBox.module.css";

interface ErrorBoxProps {
    message: string | null;
}
  
const ErrorBox = ({ message }: ErrorBoxProps) => {
    if (!message) return null;

    return (
        <div 
            role="alert"
            className={styles.errorBoxContainer}
            data-testid="error-message">
            {message}
        </div>
    );
};
  
export default ErrorBox;