class Vote < ApplicationRecord
  belongs_to :votable, polymorphic: true

  validates :value, numericality: {only_integer: true}

end
