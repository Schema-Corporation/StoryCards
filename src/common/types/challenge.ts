export interface IChallenge {
    gameId: string;
    roomId: string;
    guestId: string;
    fullName: string;
    challengeBody: string;
    status: number;
    points: number;
}