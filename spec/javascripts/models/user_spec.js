describe("Test specs", function() {
  it("passes right", function() {
    expect(1).to.eq(1);
  });

  it("fails right", function() {
    expect(1).to.be.a("number");
  });
});
