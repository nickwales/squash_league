class PagesController < ApplicationController
  def home
  @title = "Home"
  end

  def contact
  @title = "Contact"
  end

  def about
  @title = "About"
  end

  def help
  @title = "Help"
  end
  
  def league
    @league = 1
    @title = "Leagues"
    @season = 1
    @divs = Division.where( :season_id => @season).count
    @division_ids = Division.where( :season_id => @season)
    @players = Playerdiv.where(:division_id => 1)

    @player = Array.new
    @players.each do |p|
      @player << p.user_id
    end
  
  def rankings
      @title = "Rankings"
    end

#    l = Array.new
#    for i in @players
#      games = Result.joins(:match).where(:matches => {:playerdiv_id => @league}).where(:results => {:user_id => i})
#      user = User.find(i)
#      name = user.name
#      played = games.count
#      won = games.where(:result => "win").count
#      lost = games.where(:result => "lost").count
#      points = games.sum(:points)
#      l << { :Name => name, :Played => played, :Won => won, :Lost => lost, :Points => points}
#    end
      
#    @sorted_league = l.sort_by { |position| position[:Points] }.reverse!
      
    @league_players = Playerdiv.joins(:division).where(:divisions => {:season_id => @season})
    
    @players = Result.joins(:match).where(:matches => {:playerdiv_id => 1}).where(:results => {:user_id => (params[:article])})
    
    

  end
  
  
  

end
