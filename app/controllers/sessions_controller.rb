class SessionsController < ApplicationController
  layout "login"
  skip_before_filter :require_login

  def new
  end

  def create
    user = User.find_or_create_by_provider_and_uid(params[:provider], params[:uid])
    user.update_attributes(params.slice(:name, :email))
    set_current_user(user)
    redirect_to root_path
  end

  def destroy
    set_current_user(nil)
    redirect_to login_path
  end
end