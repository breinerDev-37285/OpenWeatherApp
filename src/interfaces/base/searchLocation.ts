import { ActionDispatch, InputHTMLAttributes } from "react";
import { IAction } from "@interfaces/redux";

export interface ISearchLocationProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "style" | "className" | "onChange" | "query"
  > {
  dispatch: ActionDispatch<[IAction]>;
  loading?: boolean;
}

export interface ICityLocation {
  name: string;
  lat: number;
  lng: number;
}
