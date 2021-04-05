export interface IParticipant {
    character: number;
    abilities: IAbility[];
    challenge: string;
    avatar: string;
}

export interface IAbility {
    name: string,
    points: number
}