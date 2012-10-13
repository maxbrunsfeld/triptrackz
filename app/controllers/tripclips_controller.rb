class TripclipsController < ApplicationController

  def new
    @tripclip = Tripclip.new
  end

  def create
    data = params[:tripclip]
    current_user.tripclips.create(data)
    head :ok
  end

  def index
    @tripclips = Tripclip.all

    respond_to do |format|
      format.html

      format.json do
        json = @tripclips.map do |tripclip|
          {
            :name => tripclip.name,
            :latitude => tripclip.latitude,
            :longitude => tripclip.longitude
          }
        end

        render :json => json
      end
    end

  end

end