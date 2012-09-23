class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.where(
      :provider => params["provider"],
      :uid => params["uid"]
    ).first

    if !user
      user = User.create({
        :provider => params["provider"],
        :uid => params["uid"],
        :name => params["name"],
        :email => params["email"]
      })
    end

    set_current_user(user)
    redirect_to "/"
  end

end