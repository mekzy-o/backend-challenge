export interface TimeStampInterface {
  createdAt: Date
  updatedAt: Date
}

export interface UserInterface extends TimeStampInterface {
  id: string
  username: string
  email: string
  password: string
}
