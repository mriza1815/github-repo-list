import { useNavigate } from 'react-router';
import LoginView from './Login.view';
import { useEffect, useState } from 'react';
import { GITHUB_AUTH_CONFIG, octokit } from '@/api/config';

function Login() {
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      handleGitHubCallback(code);
    }
  }, []);

  const handleGitHubCallback = async (code: string) => {
    try {
      // Exchange code for access token using your backend
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/github/callback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      const { access_token } = await response.json();
      
      if (access_token) {
        setIsLoading(false);
        localStorage.setItem('github_token', access_token);
        octokit.auth = access_token;
        navigate('/');
      }
    } catch (error) {
      setIsLoading(false);
      setError(`Authentication failed: ${error}`);
      console.error('Authentication failed:', error);
    }
  };

  const handleGitHubLogin = () => {
    setIsLoading(true);
    const { CLIENT_ID, REDIRECT_URI, SCOPE, OAUTH_URL } = GITHUB_AUTH_CONFIG;
    
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: SCOPE,
      state: crypto.randomUUID() // Prevent CSRF attacks
    });

    window.location.href = `${OAUTH_URL}?${params.toString()}`;
  };

  return (
    <LoginView
      isLoading={isLoading}
      error={error}
      onGitHubLogin={handleGitHubLogin}  
    />
  )
}

export default Login