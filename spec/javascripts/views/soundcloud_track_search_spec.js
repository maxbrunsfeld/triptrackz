describe("views.SoundcloudTrackSearch", function() {
  var input, button, list, modal, view;

  beforeEach(function(){
    input = $("<input/>").attr("name", "search");
    button = $("<button/>").attr("name", "search");
    list = $("<ol/>").addClass("tracks");
    modal = $("<div/>").append(input, button, list);

    view = new views.SoundcloudTrackSearch({ el: modal });
  });

  describe("typing a search string and clicking the search button", function() {
    beforeEach(function() {
      sinon.spy(SC, "get");
      input.val("dubstep");
      button.click();
    });

    afterEach(function() {
      SC.get.restore();
    });

    it("makes a call to the soundcloud API", function() {
      expect(SC.get).to.have.been.called;
      var searchArgs = SC.get.args[0];
      var path = searchArgs[0];
      var options = searchArgs[1];
      expect(path).to.equal("/tracks");
      expect(options).to.eql({q : "dubstep", limit:10});
    });

    describe("when soundcloud responds with some tracks", function() {
      beforeEach(function() {
        var callback = SC.get.args[0][2];
        var results = [
          {title: "amazingdub"},
          {title: "fantasydub"}
        ]
        callback(results);
      });

      it("shows the tracks in the list", function() {
        expect(list.find("li").length).to.equal(2);
      });
      
      it("shows each track's title", function() {
        var listItems = list.find("li")
        expect(listItems.eq(0).text()).to.contain("amazingdub");
        expect(listItems.eq(1).text()).to.contain("fantasydub");
      });
    });
  });
});