# frozen_string_literal: true

class GraphqlSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)
  use GraphQL::Guard.new
end
