class GazousController < ApplicationController
  def top

  end

  def result
    image = params[:image]
    # image = Scraping.get_product(link)
    require "google/cloud/vision"
    project_id = "meter-213702"
    # Instantiates a client
    vision = Google::Cloud::Vision.new project: project_id
    # The name of the image file to annotate
    file_name = image
    res = vision.image(file_name).labels

    res.each do |label|
      puts label.inspect
    end
    @point = [560000, 89000, 0, 322900, 3499000, 11120000, 20000, 424999][rand(8)]
    @comment = ["あーれー写真てしってるかな、君面白いね","君には自分で考えるという能力がなのかな人間やめて見ようか","他人に合わせることしかできないのかな。それ、なんていうか知ってる金魚の糞て言うんだよ","あーやっちまってんな写真なめてんの、君にはスマホすら必要ないんじゃないかな","あーあーダメだこりゃ、世紀末だわ"][rand(5)]
    @logs = [{a:10, b:"田中武蔵"},{a:12, b:"太郎"},{a:39,b:"ロビンソン山田"},{a:22,b:"駒沢よしお"},{a:28,b:"東山典孝"},{a:33,b:"がが"},{a:45,b:"村山金井"}]
  end
end
