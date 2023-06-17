import axios, { AxiosResponse } from "axios";
import { GithubOauthInfo, UseGithubOauthInfoState } from "../contexts/GithubOauthContext";
import { useEffect, useState } from "react";
import { TypeOfUseState } from "../defCommon";

interface User {
  name: string;
  public_repos: number;
  updated_at: string;
}

const UserDefault: User = {
  name: "",
  public_repos: 0,
  updated_at: "",
};

interface GithubHeaders {
  baseURL: string;
  headers: {
    [key: string]: string;
  };
  withCredentials: boolean;
}

function UserInfo(): JSX.Element {
  const oauthInfo: GithubOauthInfo = UseGithubOauthInfoState();
  const [isLoading, setIsLoading]: TypeOfUseState<boolean> = useState(true);
  const [user, setUser]: TypeOfUseState<User> = useState(UserDefault);

  useEffect(() => {
    GetUserInfo(oauthInfo).then((response) => {
      if (IsUser(response)) {
        setUser(response);
        setIsLoading(false);
      }
    });
  }, [oauthInfo]);

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <div>
      <ul>
        <h3>name : {user.name}</h3>
        <h3>repos : {user.public_repos}</h3>
        <h3>updated : {user.updated_at}</h3>
      </ul>
    </div>
  );
}

async function GetUserInfo(oauthInfo: GithubOauthInfo): Promise<JSON> {
  const headers: GithubHeaders = {
    baseURL: import.meta.env.BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  const data: { access_tocken: string } = { access_tocken: oauthInfo.access_token };

  const respones: AxiosResponse<JSON, JSON> = await axios.post(import.meta.env.VITE_GITHUB_API_SEVER_URL + "/user", data, headers);

  return respones.data;
}

function IsUser(user: unknown): user is User {
  return (user as User).name !== undefined;
}

export default UserInfo;
