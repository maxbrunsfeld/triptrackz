class TriptracksController < ApplicationController
  wrap_parameters :format => [:json, :multipart_form]

  def new
    @triptrack = Triptrack.new
  end

  def create
    current_user.triptracks.create(params[:triptrack])
    head :ok
  end

  def index
    if params[:north]
      @triptracks = Triptrack.within_box(
        params[:north],
        params[:south],
        params[:east],
        params[:west]
      )
    else
      @triptracks = Triptrack.all
    end

    respond_to do |format|
      format.html { render }
      format.json { render :json => @triptracks }
    end
  end

end