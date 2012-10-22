class TripclipsController < ApplicationController
  wrap_parameters :format => [:json, :multipart_form]

  def new
    @tripclip = Tripclip.new
  end

  def create
    data = params[:tripclip]
    current_user.tripclips.create(data)
    head :ok
  end

  def index
    if params[:north]
      tripclips = Tripclip.within_box(
        params[:north],
        params[:south],
        params[:east],
        params[:west]
      )
    else
      tripclips = Tripclip.all
    end

    @json = tripclips.map do |tripclip|
      {
        :name => tripclip.name,
        :latitude => tripclip.latitude,
        :longitude => tripclip.longitude
      }
    end

    respond_to do |format|
      format.html { render }
      format.json { render :json => @json }
    end
  end

end