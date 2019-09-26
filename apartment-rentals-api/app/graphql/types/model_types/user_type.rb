# frozen_string_literal: true

module Types::ModelTypes
  class UserType < Types::BaseObject
    field :first_name, String, null: true
    field :last_name, String, null: true
    field :role, Types::EnumTypes::UserRole, null: true
    field :email, String, null: true
  end
end
