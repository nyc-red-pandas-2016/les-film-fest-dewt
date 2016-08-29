class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :movie

  validates :value, numericality: {only_integer: true, less_than_or_equal_to: 5, greater_than_or_equal_to: 1}
end
