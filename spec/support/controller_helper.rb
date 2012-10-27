module ControllerHelpers
  def sign_in(user)
    controller.set_current_user(user)
  end
end
