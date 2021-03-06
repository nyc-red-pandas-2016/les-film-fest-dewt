class Review < ApplicationRecord
  include VoteCount

  belongs_to :reviewer
  belongs_to :movie
  has_many :comments
  has_many :votes, as: :votable

  validates :title, :body, presence: true
end
