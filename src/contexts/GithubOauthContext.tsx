import { Context, createContext, useContext, useState } from "react";
import { TypeOfUseState } from "../defCommon";

export interface GithubOauthInfo {
  access_token: string;
  scope: string;
  token_type: string;
}

const GithubOauthDefualtInfo: GithubOauthInfo = {
  access_token: "",
  scope: "",
  token_type: "",
};

type TypeOfDispatch = React.Dispatch<React.SetStateAction<GithubOauthInfo>>;

export const GithubOauthStateContext: Context<GithubOauthInfo> = createContext<GithubOauthInfo>(GithubOauthDefualtInfo);
export const GithubOauthDispatchContext: Context<TypeOfDispatch | null> = createContext<TypeOfDispatch | null>(null);

export function GithubOauthInfoProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [oauthInfo, setOauthInfo]: TypeOfUseState<GithubOauthInfo> = useState(GithubOauthDefualtInfo);
  return (
    <GithubOauthStateContext.Provider value={oauthInfo}>
      <GithubOauthDispatchContext.Provider value={setOauthInfo}>{children}</GithubOauthDispatchContext.Provider>
    </GithubOauthStateContext.Provider>
  );
}

export function UseGithubOauthInfoState(): GithubOauthInfo {
  const state: GithubOauthInfo = useContext(GithubOauthStateContext);
  if (!state) throw new Error("Cannot find GithubOauthInfoProvider");
  return state;
}

export function UseGithubOauthInfoDispatch(): TypeOfDispatch {
  const dispatch: TypeOfDispatch | null = useContext(GithubOauthDispatchContext);
  if (!dispatch || dispatch === null) throw new Error("Cannot find GithubOauthInfoProvider");

  return dispatch;
}

export function IsGithubOauthInfo(data: unknown): data is GithubOauthInfo {
  return (data as GithubOauthInfo).access_token !== undefined;
}
