import { GITHUB_URL } from "../defCommon";

function GithubLoginButton() {
  function loginToGithub(): void {
    const url = `${GITHUB_URL}?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`;
    window.location.assign(url);
  }

  return <button onClick={loginToGithub}>Github Login</button>;
}

export default GithubLoginButton;
