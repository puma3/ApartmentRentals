# frozen_string_literal: true

module Resolvers::UserResolver
  class CurrentUser < Resolvers::Base
    type Types::ModelTypes::UserType, null: true

    def resolve
      context[:current_user]
    end
  end
end
