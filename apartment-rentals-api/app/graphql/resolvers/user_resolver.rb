# frozen_string_literal: true

module Resolvers
  module UserResolver
    class CurrentUser < Resolvers::Base
      type Types::ModelTypes::UserType, null: true

      def resolve
        context[:current_user]
      end
    end
  end
end
