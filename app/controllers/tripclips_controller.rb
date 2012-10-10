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

    #render :json => [
    #  {
    #    :name => "Journey Down the 1",
    #    :author => {
    #      :id => 1,
    #      :name => "John Smith"
    #    },
    #    :length => 2700,
    #    :locations => [
    #      [37.7208, -122.4958],
    #      [37.6139, -122.4858],
    #      [35.5642, -121.0797],
    #      [34.4208, -119.6972],
    #      [34.0522, -118.2428]
    #    ]
    #  },
    #  {
    #    :name => "California Wine Tour",
    #    :author => {
    #      :id => 2,
    #      :name => "Louie Loud"
    #    },
    #    :length => 2700,
    #    :locations => [
    #      [37.8188, -122.4784],
    #      [38.6106, -122.8681],
    #      [38.2919, -122.4569],
    #      [38.2972, -122.2844]
    #    ]
    #  },
    #  {
    #    :name => "California Deserts",
    #    :author => {
    #      :id => 3,
    #      :name => "Lizard Man"
    #    },
    #    :length => 2700,
    #    :locations => [
    #      [37.7397, -121.4242],
    #      [36.7478, -119.7714],
    #      [35.6225, -117.6700],
    #      [36.2419, -116.8258]
    #    ]
    #  }
    #]
  end

end