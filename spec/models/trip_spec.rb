require "spec_helper"

describe Trip do
  describe ".within_box" do
    it "returns no trips" do
      Trip.within_box(1, 2, 3, 4).should == []
    end
  end
end