class Review < ApplicationRecord
  belongs_to :reviewer
  belongs_to :movie
  has_many :comments
  has_many :votes, as: :votable
end
