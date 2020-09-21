import { ICards } from "./card";

export interface IGroup {
    id: number;
    imgLocation: string;
    cardImgArray?: [ICards];
}