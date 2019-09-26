# frozen_string_literal: true

module Resolvers::UserResolver
  class CurrentUser < Resolvers::Base
    type Types::ModelTypes::UserType, null: true

    def resolve
      context[:current_user]
    end
  end

  class UserList < Resolvers::Base
    type [Types::ModelTypes::UserType], null: true

    argument :role, Types::EnumTypes::UserRole, required: false

    def resolve(role: 'client')
      # TODO: Do some authorization
      User.where(role: role)
    end
  end
end
