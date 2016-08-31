class MovieSerializer < ActiveModel::Serializer
  attributes :id,:title,:description,:poster_url,:year
  has_many :reviews
  has_many :ratings
  has_many :genres
end
