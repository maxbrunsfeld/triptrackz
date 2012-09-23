class ApplicationController < ActionController::Base
  protect_from_forgery

  def current_user
    id = session[:user_id]
    User.find(id) if id
  end

  def set_current_user(user)
    session[:user_id] = user.id
  end
end