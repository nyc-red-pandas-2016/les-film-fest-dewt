class User < ApplicationRecord
  has_many :comments
  has_many :votes
  has_many :ratings

  self.inheritance_column = "type"
end
