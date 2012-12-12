class TripsController < ApplicationController
  wrap_parameters :format => [:json, :multipart_form]

  def new
    @trip = Trip.new
  end

  def create
    current_user.trips.create(params[:trip])
    head :ok
  end

  def index
    if params[:north]
      @trips = Trip.within_box(
        params[:north],
        params[:south],
        params[:east],
        params[:west]
      )
    else
      @trips = Trip.all
    end

    respond_to do |format|
      format.html { render }
      format.json { render :json => @trips }
    end
  end

end