import { SetURLSearchParams } from "react-router-dom";

export type TypeOfUseState<T> = [T, React.Dispatch<React.SetStateAction<T>>];
export type TypeOfUseSearchParam = [URLSearchParams, SetURLSearchParams]