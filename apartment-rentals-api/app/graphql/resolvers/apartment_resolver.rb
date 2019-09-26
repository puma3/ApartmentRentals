# frozen_string_literal: true

module Resolvers::ApartmentResolver
  class ApartmentList < Resolvers::Base
    type [Types::ModelTypes::ApartmentType], null: true

    def resolve
      condition = {}
      condition[:available] = true

      Apartment.where(condition)
    end
  end
end
