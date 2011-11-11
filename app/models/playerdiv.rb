class Playerdiv < ActiveRecord::Base
  belongs_to :division
  has_many :matches
  has_many :players
end
