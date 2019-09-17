# frozen_string_literal: true

class Apartment < ApplicationRecord
  belongs_to :realtor, class_name: 'User'
end
