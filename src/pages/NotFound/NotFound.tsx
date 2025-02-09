import { useNavigate } from "react-router";
import styles from "./Notfound.module.css"

const PageNotFound = () => {
    const navigate = useNavigate();
    
    const goToHome = () => {
        navigate("/")
    }
    return (
        <div className={styles.container}>
            <h1 className="text-2xl">404 - Page not found!</h1>
            <button type="button" onClick={goToHome} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                Go Home!
            </button>
        </div>
    )
}

export default PageNotFound;