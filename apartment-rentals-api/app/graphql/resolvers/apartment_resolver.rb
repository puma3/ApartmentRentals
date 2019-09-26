# frozen_string_literal: true

module Resolvers::ApartmentResolver
  class ApartmentList < Resolvers::Base
    type [Types::ModelTypes::ApartmentType], null: true

    def resolve
      condition = {}
      condition[:available] = true if context[:current_user] == 'client'

      Apartment.where(condition).order(:id)
    end
  end
end
