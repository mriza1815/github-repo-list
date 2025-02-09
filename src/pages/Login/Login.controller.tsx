import { useNavigate } from 'react-router';
import LoginView from './Login.view';
import { useState } from 'react';

function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClickSubmit = async() => {
      //setError(null);
      setIsLoading(true);
  
      try {
        // Create Basic Auth string
        const basicAuth = btoa(`${username}:${password}`);
  
        // Request to create a new personal access token
        const response = await fetch('https://api.github.com/authorizations', {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            note: 'Repository Explorer App Token',
            scopes: ['repo', 'user'],
          }),
        });
  
        if (!response.ok) {
          throw new Error('Authentication failed');
        }
  
        const data = await response.json();
        console.log("data", data)
        const token = data.token;
  
        // Verify token works by creating an Octokit instance
        // const octokit = new Octokit({
        //   auth: token
        // });
  
        // Test the token with a simple API call
        //await octokit.users.getAuthenticated();
  
        // Store token securely
        //localStorage.setItem('github_token', token);
  
        // Navigate to main page
        //navigate('/repositories');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Login failed');
      } finally {
        setIsLoading(false);
        //navigate('/app')
      }
  }

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <LoginView
      isLoading={isLoading}
      error={error}
      username={username}
      password={password}
      onClickSubmit={onClickSubmit} 
      onChangeUsername={onChangeUsername} 
      onChangePassword={onChangePassword} 
    />
  )
}

export default Login