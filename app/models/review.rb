class Review < ActiveRecord::Base

  has_many :votes
  belongs_to :user
  belongs_to :facility

  validates :body, presence: true
  validates_uniqueness_of :user_id, scope: :facility_id

  def score
    score = votes.where(is_up: true).size - votes.where(is_up: false).size
  end
end
