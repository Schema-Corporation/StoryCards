export interface IParticipant {
    character: number;
    abilities: IAbility[];
    challenge: string;
    avatar: number;
}

export interface IAbility {
    name: string,
    points: number
}