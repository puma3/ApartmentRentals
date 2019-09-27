# frozen_string_literal: true

module Mutations::ApartmentMutations
  class CreateApartment < Mutations::BaseMutation
    argument :name, String, required: true
    argument :description, String, required: true
    argument :price_per_month, Float, required: true
    argument :floor_area_size, Float, required: true
    argument :number_of_rooms, Int, required: true
    argument :address, String, required: false
    argument :latitude, Float, required: true
    argument :longitude, Float, required: true
    argument :realtor_email, String, required: true

    field :apartment, Types::ModelTypes::ApartmentType, null: true
    description 'Creates an apartment'

    def resolve(name:, description:, price_per_month:, floor_area_size:, number_of_rooms:, address:, latitude:, longitude:, realtor_email:)
      return GraphQL::ExecutionError.new('You are not allowed to perform this') if context[:current_user].client?

      realtor = User.find_for_authentication(email: realtor_email)
      return GraphQL::ExecutionError.new('An existing realtor email is required') unless realtor

      valid_inputs = { name: name, description: description, price_per_month: price_per_month, floor_area_size: floor_area_size,
                       number_of_rooms: number_of_rooms, address: address, latitude: latitude, longitude: longitude }
      valid_inputs[:realtor] = realtor

      apartment = Apartment.new(valid_inputs)
      if apartment.save
        { apartment: apartment }
      else
        GraphQL::ExecutionError.new('There was an error while creating this apartment')
      end
    end
  end

  class UpdateApartment < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :name, String, required: false
    argument :description, String, required: false
    argument :price_per_month, Float, required: false
    argument :floor_area_size, Float, required: false
    argument :number_of_rooms, Int, required: false
    argument :address, String, required: false
    argument :latitude, Float, required: false
    argument :longitude, Float, required: false
    argument :longitude, Float, required: false
    argument :available, Boolean, required: false
    argument :realtor_email, String, required: false

    field :apartment, Types::ModelTypes::ApartmentType, null: true
    description 'Updates an Apartment'

    # def resolve(id:, name:, description:, price_per_month:, floor_area_size:, number_of_rooms:, address:, latitude:, longitude:, realtor_email:)
    def resolve(arguments)
      return GraphQL::ExecutionError.new('You are not allowed to perform this') if context[:current_user].client?

      apartment = Apartment.find_by_id(arguments[:id])
      return GraphQL::ExecutionError.new('Please provide a correct apartment ID') unless apartment

      realtor = User.find_for_authentication(email: arguments[:realtor_email]) if arguments[:realtor_email]
      return GraphQL::ExecutionError.new('An existing realtor email is required') if !realtor && arguments[:realtor_email]

      valid_inputs = arguments.to_h.except(:id, :realtor_email)

      apartment.assign_attributes(valid_inputs)
      apartment.realtor = realtor if realtor
      if apartment.save
        { apartment: apartment }
      else
        GraphQL::ExecutionError.new('There was an error while updating this user')
      end
    end
  end

  class DeleteApartment < Mutations::BaseMutation
    argument :id, ID, required: true

    field :success, Boolean, null: false
    description 'Deletes an Aparment'

    def resolve(id:)
      return GraphQL::ExecutionError.new('You are not allowed to perform this') if context[:current_user].client?

      apartment = Apartment.find_by_id(id)
      return GraphQL::ExecutionError.new('Please provide a correct apartment ID') unless apartment

      if apartment.delete
        { success: true }
      else
        GraphQL::ExecutionError.new('There was an error while deleting this user')
      end
    end
  end
end
