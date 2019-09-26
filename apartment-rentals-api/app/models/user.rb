# frozen_string_literal: true

class User < ApplicationRecord
  acts_as_token_authenticatable
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_secure_token :authentication_token

  enum role: { admin: 0, realtor: 1, client: 2 }

  # before_create :generate_secure_token

  # def generate_secure_token
  #   regenerate_authentication_token
  # end
end
