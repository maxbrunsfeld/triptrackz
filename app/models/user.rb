class User < ActiveRecord::Base
  attr_accessible :email, :provider, :name, :email, :uid
end
