import { useSearchParams } from "react-router-dom";
import { TypeOfUseSearchParam } from "../defCommon";
import axios from "axios";
import { useEffect } from "react";

const GITHUB_CLIENT_ID: string = import.meta.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRETS: string = import.meta.env.VITE_GITHUB_CLIENT_SECRETS;

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

function GithubInfo(): JSX.Element {
  const [searchParams]: TypeOfUseSearchParam = useSearchParams();
  const code: string | null = searchParams.get("code");

  const ClientInfo: GithubClientInfo = {
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRETS,
    code: code,
  };

  const headers: GithubHeaders = {
    baseURL: import.meta.env.BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  useEffect(() => {
    (async () => {
      await axios
        .post(import.meta.env.VITE_GITHUB_ACCESS_TOKEN_URL, ClientInfo, headers)
        .then((respones) => {
          console.log(respones);
          if (respones.status === 200) {
            const json: JSON = respones.data;
            if ("access_token" in json) {
              console.log(json["access_token"]);
            }
          }
        })
        .catch((response) => console.log("[error]" + response));
    })(),
      [];
  });

  return <div>Loading...</div>;
}

export default GithubInfo;
