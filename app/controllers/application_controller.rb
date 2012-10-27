class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :require_login

  def current_user
    id = session[:user_id]
    User.find_by_id(id) if id
  end

  def set_current_user(user)
    user_id = user ? user.id : nil
    session[:user_id] = user_id
  end

  private

  def require_login
    redirect_to login_path unless current_user
  end
end
