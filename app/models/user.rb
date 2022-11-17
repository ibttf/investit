class User < ApplicationRecord
    has_many :portfolios

    
    has_secure_password

    validates :username, presence: true, uniqueness: true
end
