module Users
  class RegistrationController < ApiGuard::RegistrationController
    before_action :authenticate_resource, only: [:destroy]

    def create
      begin
        init_resource(sign_up_params)
        if resource.save
          create_token_and_set_header(resource, resource_name)
          render_success(data: resource, message: "#{resource_name.capitalize} created successfully")
        else
          render_error(422, object: resource)
        end
      rescue ActiveRecord::RecordNotUnique
        payload = {
          error: "An account with that email already exists",
          ok: false
        }
        render json: payload, status: 422
      end
    end

    def destroy
      current_resource.destroy
      render_success(message: "#{resource_name.capitalize} destroyed successfully")
    end

    private

    def sign_up_params
      params.permit(:email, :password, :password_confirmation)
    end
  end
end
