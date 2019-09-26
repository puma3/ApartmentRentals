# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :test_field, String, null: false,
                               description: 'An example field added by the generator'
    def test_field
      'Hello World'
    end

    field :signInUser, mutation: Mutations::UserMutations::SignInUser
    field :registerUser, mutation: Mutations::UserMutations::RegisterUser
    field :updateUser, mutation: Mutations::UserMutations::UpdateUser
    field :deleteUser, mutation: Mutations::UserMutations::DeleteUser
  end
end
