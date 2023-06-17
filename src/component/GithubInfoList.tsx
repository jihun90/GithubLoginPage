import { GithubOauthInfo, UseGithubOauthInfoState } from "../contexts/GithubOauthContext";

function GithubInfoList() {
  const oauthInfo: GithubOauthInfo = UseGithubOauthInfoState();

  return (
    <div>
      <ul>
        <li>{oauthInfo.access_token}</li>
        <li>{oauthInfo.scope}</li>
        <li>{oauthInfo.token_type}</li>
      </ul>
    </div>
  );
}

export default GithubInfoList;
