class ApplicationController < ActionController::Base
  protect_from_forgery

  def current_user
    id = session[:user_id]
    User.find_by_id(id) if id
  end

  def set_current_user(user)
    user_id = user ? user.id : nil
    session[:user_id] = user_id
  end

  def render_html_or_json(json)
    @json = json
    respond_to do |format|
      format.html { render }
      format.json { render :json => @json }
    end
  end
end
