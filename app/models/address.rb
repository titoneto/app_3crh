class Address < ApplicationRecord
  belongs_to :user
  validates :street, :city, :state, :zip_code, presence: true
end
