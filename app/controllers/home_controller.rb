class HomeController < ApplicationController
  def index
    redirect_to "/login" unless current_user
  end
end