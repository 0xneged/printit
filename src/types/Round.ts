export type Deposit = { address: string; amount: number }
export enum RoundStatus {
  ongoing,
  ended,
}

export default interface Round {
  startTime: string
  endTime: string
  deposits: Deposit[]
  winner: string
  winnerAmount: number
  roundStatus: RoundStatus
}
