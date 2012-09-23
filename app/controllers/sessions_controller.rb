class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.find_or_create_by_provider_and_uid(params["provider"], params["uid"])
    user.update_attributes(params.slice("name", "email"))
    set_current_user(user)
    redirect_to "/"
  end

end