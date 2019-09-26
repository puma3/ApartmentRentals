# frozen_string_literal: true

module Types::ModelTypes
  class UserType < Types::BaseObject
    field_class Fields::Guardable

    field :first_name, String, null: true
    field :last_name, String, null: true
    field :role, Types::EnumTypes::UserRole, null: true
    field :email, String, null: true
    field :authentication_token, String, null: true do
      guard ->(obj, _args, ctx) { ctx[:current_user] == obj.object }
    end
  end
end
