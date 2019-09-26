# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    # field :test_field, String, null: false,
    #                            description: 'An example field added by the generator'
    # def test_field
    #   'Hello World!'
    # end

    field :current_user, resolver: Resolvers::UserResolver::CurrentUser,
                         description: 'Fetches current user'
    field :apartments, resolver: Resolvers::ApartmentResolver::ApartmentList,
                       description: 'Fetches available or all apartments depending on user role'
  end
end
