import { useSearchParams } from "react-router-dom";
import { TypeOfUseSearchParam, GITHUB_ACCESS_TOKEN_URL } from "../defCommon";
import axios from "axios";
import { useEffect } from "react";

const GITHUB_CLIENT_ID: string = import.meta.env.VITE_GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRETS: string = import.meta.env.VITE_GITHUB_CLIENT_SECRETS;

function GithubInfo(): JSX.Element {
  const [searchParams]: TypeOfUseSearchParam = useSearchParams();
  const code: string | null = searchParams.get("code");

  useEffect(() => {
    (async () => {
      await axios
        .post(GITHUB_ACCESS_TOKEN_URL, {
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRETS,
          code: code,
        })
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
  }, []);

  return <div>Loading...</div>;
}

export default GithubInfo;
