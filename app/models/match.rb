class Match < ActiveRecord::Base
  has_many :results, :dependent => :delete_all
  has_many :rankings, :dependent => :delete_all
  belongs_to :playerdiv
  accepts_nested_attributes_for :results, :rankings
  
 # before_create :update_elo_score
  

#  validates :match, :unique_result => true
  
end
