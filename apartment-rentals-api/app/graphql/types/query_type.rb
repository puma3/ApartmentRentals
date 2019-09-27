# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :current_user, resolver: Resolvers::UserResolver::CurrentUser,
                         description: 'Fetches current user'
    field :users, resolver: Resolvers::UserResolver::UserList,
                  description: 'Fetches the complete list of users that have a specific role'
    field :apartments, resolver: Resolvers::ApartmentResolver::ApartmentList,
                       description: 'Fetches available or all apartments depending on user role'
    field :availableFilters, resolver: Resolvers::ApartmentResolver::AvailableFilters,
                             description: 'Returns an object with filter ranges'
  end
end
