# frozen_string_literal: true

module Types::EnumTypes
  class UserRole < Types::BaseEnum
    value 'ADMIN', value: 'admin'
    value 'REALTOR', value: 'realtor'
    value 'CLIENT', value: 'client'
  end
end
