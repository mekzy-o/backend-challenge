export interface TimeStampInterface {
  createdAt: Date
  updatedAt: Date
}

export interface AnswerInterface extends TimeStampInterface {
  id: string
  response: string
  questionId: string
  userId: string
}
