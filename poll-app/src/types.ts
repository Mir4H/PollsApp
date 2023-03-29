export interface IPolls {
  poll_id: number
  title: string
  created_at: string
}

export interface IAnswers {
  choice_id: number
  text: string
  votes: number
  poll_id: number
}

export interface Formvalues {
  poll: string
}

export interface PBProps {
  id?: string
  text: string
  func?: () => void
  disabled?: boolean
}

export interface SOProps {
  answers: IAnswers[]
  setAnswer: (value: string) => void
}

export interface FormvaluesCF {
  option1: string
  option2: string
  option3: string
  option4: string
  option5: string
}

export type Endpoints = {
    polls: string
    choices: string
  }

export interface FormvaluesPF {
    poll: string
  }