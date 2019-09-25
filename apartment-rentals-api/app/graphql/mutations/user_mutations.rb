# frozen_string_literal: true

module Mutations::UserMutations
  class SignInUser < Mutations::BaseMutation
    # name 'signInUser'

    argument :email, String, required: true
    argument :password, String, required: true

    field :user, Types::ModelTypes::UserType, null: true
    description 'Signs in a user'

    def resolve(email:, password:)
      user = User.find_for_authentication(email: email)
      return GraphQL::ExecutionError.new('Invalid email or password') unless user

      valid = user.valid_password?(password)

      if valid
        context[:current_user] = user
        { user: user }
      else
        GraphQL::ExecutionError.new('Invalid email or password')
      end
    end
  end
end
