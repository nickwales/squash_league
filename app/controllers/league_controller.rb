class LeagueController < ApplicationController
  
  def show
    @title = "Leagues"
    @season = 1
    @divs = Division.where( :season_id => @season).count
      
    @league_players = Playerdiv.joins(:division).where(:divisions => {:season_id => @season})
    @players = Result.joins(:match).where(:matches => {:playerdiv_id => 1}).where(:results => {:user_id => (params[:article])})
 
   
    
 
  end
end
