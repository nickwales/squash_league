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

    
    @league_players = Playerdiv.joins(:division).where(:divisions => {:season_id => @season})
    
    @players = Result.joins(:match).where(:matches => {:playerdiv_id => 1}).where(:results => {:user_id => (params[:article])})

  end
  

  

end
