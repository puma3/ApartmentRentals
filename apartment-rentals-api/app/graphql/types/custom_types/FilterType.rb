# frozen_string_literal: true

module Types::CustomTypes
  class FilterType < Types::BaseObject
    field :min_price, Float, null: true
    field :max_price, Float, null: true
    field :min_size, Float, null: true
    field :max_size, Float, null: true
    field :min_rooms, Int, null: true
    field :max_rooms, Int, null: true
  end
end
