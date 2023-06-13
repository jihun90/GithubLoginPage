import { useSearchParams } from "react-router-dom";
import { TypeOfUseSearchParam, TypeOfUseState } from "../defCommon";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const GITHUB_CLIENT_ID: string = import.meta.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRETS: string = import.meta.env.VITE_GITHUB_CLIENT_SECRETS;
const GITHUB_ACCESS_TOKEN_URL: string = import.meta.env.VITE_GITHUB_ACCESS_TOKEN_URL;

interface GithubClientInfo {
  client_id: string;
  client_secret: string;
  code: string | null;
}

interface GithubHeaders {
  baseURL: string;
  headers: {
    [key: string]: string;
  };
  withCredentials: boolean;
}

interface GithubOauthInfo {
  access_token: string;
  scope: string;
  token_type: string;
}

function isGithubOauthInfo(data: unknown): data is GithubOauthInfo {
  return (data as GithubOauthInfo).access_token !== undefined;
}

function GithubInfo(): JSX.Element {
  const [isLoading, setIsLoading]: TypeOfUseState<boolean> = useState(true);
  const [searchParams]: TypeOfUseSearchParam = useSearchParams();
  const code: string | null = searchParams.get("code");
  const [acessTocken, setAcessTocken]: TypeOfUseState<string> = useState("");

  useEffect(() => {
    const clientInfo: GithubClientInfo = {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRETS,
      code: code,
    };
    PostClientInfo(clientInfo).then((respones) => {
      if (isGithubOauthInfo(respones)) {
        setAcessTocken(respones.access_token);
        setIsLoading(false);
      }
    });
  }, [code]);

  return isLoading ? <div>Loading...</div> : <div>{acessTocken}</div>;
}

async function PostClientInfo(clientInfo: GithubClientInfo): Promise<JSON> {
  const headers: GithubHeaders = {
    baseURL: import.meta.env.BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const result: AxiosResponse<JSON, JSON> = await axios.post(GITHUB_ACCESS_TOKEN_URL, clientInfo, headers);

  return result.data;
}

export default GithubInfo;
