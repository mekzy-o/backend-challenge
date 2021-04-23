export interface TimeStampInterface {
  createdAt: Date
  updatedAt: Date
}

enum Vote {
  UPVOTE = 'upvote',
  DOWNVOTE = 'downvote'
}

export interface RatingInterface extends TimeStampInterface {
  id: string
  vote: Vote
  questionId: string
  userId: string
}
