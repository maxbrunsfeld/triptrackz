class ApplicationController < ActionController::Base
  protect_from_forgery

  def current_user
    id = session[:user_id]
    User.find(id) if id
  end

  def set_current_user(user)
    user_id = user ? user.id : nil
    session[:user_id] = user_id
  end
end
