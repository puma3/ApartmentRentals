# frozen_string_literal: true

class Mutations::BaseMutation < GraphQL::Schema::RelayClassicMutation
  # include Pundit
  object_class Types::BaseObject
  field_class Types::BaseField
  input_object_class Types::BaseInputObject
end
