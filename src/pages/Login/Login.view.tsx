import UserInput from "../../components/UserInput/UserInput"
import styles from "./Login.module.css"

interface LoginProps {
  onClickSubmit: () => void,
  username: string,
  password: string,
  isLoading: boolean,
  error: string | null,
  onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void

}

const LoginView = ({ username, password, isLoading, error, onClickSubmit, onChangeUsername, onChangePassword }: LoginProps) => {

  console.log("loading states", {isLoading, error})
  return (
    <div className={styles.container}>
        <div className={styles.header}>
          <img
            alt="Your Company"
            src="assets/logo.svg"
            className={styles.logo}
          />
          <h2 className={styles.title}>
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className={styles.inputLabel}>
                Username
              </label>
              <div className="mt-2">
                <UserInput
                  name="username"
                  type="username"
                  value={username}
                  autoComplete="username"
                  onChange={onChangeUsername}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className={styles.inputLabel}>
                  Password
                </label>
              </div>
              <div className="mt-2">
                <UserInput
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={onChangePassword}
                />
              </div>
            </div>

            <div>
              <button
                onClick={onClickSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default LoginView