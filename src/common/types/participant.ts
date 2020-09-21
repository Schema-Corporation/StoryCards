export interface IParticipant {
    character: number;
    abilites: IAbility[];
    challenge: string;
}

export interface IAbility {
    name: string,
    points: number
}