class Scraping
  def self.get_product(link)
    agent = Mechanize.new
    page = agent.get(link)
    image_url = page.at('.KL4Bh img')[:src] if page.at('.KL4Bh img')
  end
end
