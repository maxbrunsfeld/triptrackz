def log_in(name)
  visit "/login"
  click_link "Test Login"
  fill_in "name", :with => name
  fill_in "email", :with => "louie@example.com"
  click_button "Sign In"
end