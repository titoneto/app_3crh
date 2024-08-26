class User < ApplicationRecord
    has_many :addresses, dependent: :destroy
    validates :name, :email, :cpf, :birthdate, presence: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :cpf, uniqueness: true

    accepts_nested_attributes_for :addresses, allow_destroy: true
end
