import { ICards } from "./card";

export interface IGroup {
    id: number;
    title: string;
    imgLocation: string;
    cardImgArray?: ICards[];
}