export interface IChallenge {
    challengeId: string;
    gameId: string;
    roomId: string;
    guestId: string;
    fullName: string;
    challengeBody: string;
    status: number;
    points: number;
}