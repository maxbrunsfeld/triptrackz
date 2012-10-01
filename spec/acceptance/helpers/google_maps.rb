def google_map(selector)
  JSON.parse(find(selector).text)
rescue
  {}
end
