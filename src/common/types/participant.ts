export interface IParticipant {
    character: number;
    abilities: IAbility[];
    challenge: string;
}

export interface IAbility {
    name: string,
    points: number
}