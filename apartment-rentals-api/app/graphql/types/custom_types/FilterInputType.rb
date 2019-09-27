# frozen_string_literal: true

module Types::CustomTypes
  class FilterInputType < Types::BaseInputObject
    description 'Attributes for filter argument'

    argument :min_price, Float, required: false
    argument :max_price, Float, required: false
    argument :min_size, Float, required: false
    argument :max_size, Float, required: false
    argument :min_rooms, Int, required: false
    argument :max_rooms, Int, required: false
  end
end
