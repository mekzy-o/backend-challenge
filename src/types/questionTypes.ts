export interface TimeStampInterface {
  createdAt: Date
  updatedAt: Date
}

export interface QuestionInterface extends TimeStampInterface {
  id: string
  title: string
  body: string
  owner: string
}
