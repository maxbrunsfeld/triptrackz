describe("views.TrackSearch", function() {
  var input, searchButton, addTrackButton, list, modal, view, trip;

  beforeEach(function(){
    input = $("<input/>").attr("name", "search");
    searchButton = $("<button/>").attr("name", "search");
    addTrackButton = $("<button/>").attr({
      name: "add-track",
      disabled: "disabled"
    });
    list = $("<ol/>").addClass("tracks");
    modal = $("<div/>").append(input, searchButton, list, addTrackButton);

    trip = new models.Trip();

    view = new views.TrackSearch({ el: modal, trip: trip });
  });

  describe("typing a search string and clicking the search button", function() {
    beforeEach(function() {
      sinon.spy(SC, "get");
      input.val("dubstep");
      searchButton.click();
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
      var trackLinks;
      
      beforeEach(function() {
        var callback = SC.get.args[0][2];
        var results = [
          { id: 1, title: "amazingdub"},
          { id: 2, title: "fantasydub"}
        ]
        callback(results);
        trackLinks = list.find("li a");
      });

      it("shows the tracks in the list as links", function() {
        expect(trackLinks.length).to.equal(2);
      });
      
      it("shows each track's title", function() {
        expect(trackLinks.eq(0).text()).to.contain("amazingdub");
        expect(trackLinks.eq(1).text()).to.contain("fantasydub");
      });
      
      describe("clicking on a track", function() {
        beforeEach(function() {
          trackLinks.eq(0).click();
        });

        it("marks that track as selected", function() {
          expect(trackLinks.eq(0)).to.have.class("selected");
        });

        it("marks the other tracks as deselected", function() {
          trackLinks.eq(1).click();
          expect(trackLinks.eq(0)).not.to.have.class("selected");
          expect(trackLinks.eq(1)).to.have.class("selected");
        });

        it("enables the 'add track' button", function() {
          expect(addTrackButton).not.to.be.disabled;
        })

        describe("clicking the 'add track' button", function() {
          it("adds the selected soundcloud track to the trip", function() {
            var tracks = trip.tracks;
            expect(tracks.length).to.equal(0);

            addTrackButton.click();

            expect(tracks.length).to.equal(1);
            expect(tracks.first().get("title")).to.equal("amazingdub")
          });
        });
      });
    });
  });
});