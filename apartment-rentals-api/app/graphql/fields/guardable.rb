# frozen_string_literal: true

class Fields::Guardable < GraphQL::Schema::Field
  accepts_definition :guard
end
