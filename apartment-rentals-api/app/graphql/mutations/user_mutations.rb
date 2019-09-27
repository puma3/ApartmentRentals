# frozen_string_literal: true

module Mutations::UserMutations
  class SignInUser < Mutations::BaseMutation
    argument :email, String, required: true
    argument :password, String, required: true

    field :user, Types::ModelTypes::UserType, null: true
    description 'Signs in a user'

    def resolve(email:, password:)
      user = User.find_for_authentication(email: email)
      return GraphQL::ExecutionError.new('Invalid email or password') unless user

      valid = user.valid_password?(password)

      if valid
        context[:current_user] = user
        { user: user }
      else
        GraphQL::ExecutionError.new('Invalid email or password')
      end
    end
  end

  class RegisterUser < Mutations::BaseMutation
    argument :first_name, String, required: true
    argument :last_name, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true
    argument :role, Types::EnumTypes::UserRole, required: false

    field :user, Types::ModelTypes::UserType, null: true
    description 'Signs in a user'

    def resolve(first_name:, last_name:, email:, password:, role: 'client')
      user = User.find_for_authentication(email: email)
      return GraphQL::ExecutionError.new("A user with the email #{email} already exists") if user

      valid_inputs = { first_name: first_name, last_name: last_name, email: email, password: password }
      valid_inputs[:role] = role if context[:current_user]&.admin?

      user = User.new(valid_inputs)
      if user.save
        { user: user }
      else
        GraphQL::ExecutionError.new('There was an error while creating this user')
      end
    end
  end

  class UpdateUser < Mutations::BaseMutation
    argument :first_name, String, required: true
    argument :last_name, String, required: true
    argument :email, String, required: true
    argument :role, Types::EnumTypes::UserRole, required: false

    field :user, Types::ModelTypes::UserType, null: true
    description 'Signs in a user'

    def resolve(first_name:, last_name:, email:, role: nil)
      return GraphQL::ExecutionError.new('You are not allowed to perform this') unless context[:current_user].admin?

      user = User.find_for_authentication(email: email)
      return GraphQL::ExecutionError.new('Invalid email address') unless user

      valid_inputs = { first_name: first_name, last_name: last_name, email: email }
      valid_inputs[:role] = role if role

      user.assign_attributes(valid_inputs)
      if user.save
        { user: user }
      else
        GraphQL::ExecutionError.new('There was an error while updating this user')
      end
    end
  end

  class DeleteUser < Mutations::BaseMutation
    argument :email, String, required: true

    field :success, Boolean, null: false
    description 'Signs in a user'

    def resolve(email:)
      return GraphQL::ExecutionError.new('You are not allowed to perform this') unless context[:current_user].admin?

      user = User.find_for_authentication(email: email)
      return GraphQL::ExecutionError.new('Invalid email address') unless user

      if user.delete
        { success: true }
      else
        GraphQL::ExecutionError.new('There was an error while deleting this user')
      end
    end
  end
end
