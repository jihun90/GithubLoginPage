import { useSearchParams } from "react-router-dom";
import { TypeOfUseSearchParam } from "../defCommon";

function GithubInfo(): JSX.Element {
  const [searchParams]: TypeOfUseSearchParam = useSearchParams();
  const code: string | null = searchParams.get("code");

  return <text>${code}</text>;
}

export default GithubInfo;
