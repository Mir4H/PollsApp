import { IAnswers } from "../types"

export const clickStyle = {
  cursor: 'pointer'
}

export const breakpoints = {
    default: 3,
    1200: 2,
    900: 1
  }
export const sumVotes = (answers: IAnswers[]): number => {
    const sum = answers.reduce((accumulator, currentValue) => accumulator + currentValue.votes, 0)
    return sum
}

export const getPercentage = (i: number, answers: IAnswers[]): number => {
  const sum = sumVotes(answers)
  const result: number = (answers[i].votes / sum) * 100
  return Number((Number.isNaN(result) ? 0 : result).toFixed(2))
}