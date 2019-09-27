# frozen_string_literal: true

module Resolvers::ApartmentResolver
  class ApartmentList < Resolvers::Base
    type [Types::ModelTypes::ApartmentType], null: true

    argument :filters, Types::CustomTypes::FilterInputType, required: false

    def resolve(filters: nil)
      condition = {}
      condition[:available] = true if context[:current_user].client?

      filters = filters.to_h

      size_condition = if filters[:min_size]
                         if filters[:max_size]
                           "floor_area_size BETWEEN #{filters[:min_size]} AND #{filters[:max_size]}"
                         else
                           "floor_area_size > #{filters[:min_size]}"
                         end
                       elsif filters[:max_size]
                         "floor_area_size < #{filters[:max_size]}"
                       end

      price_condition = if filters[:min_price]
                          if filters[:max_price]
                            "price_per_month BETWEEN #{filters[:min_price]} AND #{filters[:max_price]}"
                          else
                            "price_per_month > #{filters[:min_price]}"
                          end
                        elsif filters[:max_price]
                          "price_per_month < #{filters[:max_price]}"
                        end

      rooms_condition = if filters[:min_rooms]
                          if filters[:max_rooms]
                            "number_of_rooms BETWEEN #{filters[:min_rooms]} AND #{filters[:max_rooms]}"
                          else
                            "number_of_rooms > #{filters[:min_rooms]}"
                          end
                        elsif filters[:max_rooms]
                          "number_of_rooms < #{filters[:max_rooms]}"
                        end

      Apartment.where(condition)
               .where(size_condition)
               .where(price_condition)
               .where(rooms_condition)
               .order(:id)
    end
  end

  class FilterRange
    attr_accessor :min_price, :max_price, :min_size, :max_size, :min_rooms, :max_rooms

    def initialize(params = {})
      @min_size = params[:min_size]
      @max_size = params[:max_size]
      @min_price = params[:min_price]
      @max_price = params[:max_price]
      @min_rooms = params[:min_rooms]
      @max_rooms = params[:max_rooms]
    end
  end

  class AvailableFilters < Resolvers::Base
    type Types::CustomTypes::FilterType, null: true

    def resolve
      FilterRange.new(
        min_price: Apartment.minimum(:price_per_month),
        max_price: Apartment.maximum(:price_per_month),
        min_size: Apartment.minimum(:floor_area_size),
        max_size: Apartment.maximum(:floor_area_size),
        min_rooms: Apartment.minimum(:number_of_rooms),
        max_rooms: Apartment.maximum(:number_of_rooms)
      )
    end
  end
end
