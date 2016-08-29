class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :review
  has_many :votes, as: :votable

  validates :body, :user_id, :review_id, presence: true
end
