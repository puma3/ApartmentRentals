# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    # User mutations
    field :signInUser, mutation: Mutations::UserMutations::SignInUser
    field :registerUser, mutation: Mutations::UserMutations::RegisterUser
    field :updateUser, mutation: Mutations::UserMutations::UpdateUser
    field :deleteUser, mutation: Mutations::UserMutations::DeleteUser

    # Apartment mutations
    field :createApartment, mutation: Mutations::ApartmentMutations::CreateApartment
    field :updateApartment, mutation: Mutations::ApartmentMutations::UpdateApartment
    field :deleteApartment, mutation: Mutations::ApartmentMutations::DeleteApartment
  end
end
