import React from "react";
import { SetURLSearchParams } from "react-router-dom";

export type TypeOfUseState<T> = [T, React.Dispatch<React.SetStateAction<T>>];
export type TypeOfUseSearchParam = [URLSearchParams, SetURLSearchParams];

export const GITHUB_URL = "https://github.com/login/oauth/authorize";
export const GITHUB_REDIRECT_URL = "http://localhost:5500";
