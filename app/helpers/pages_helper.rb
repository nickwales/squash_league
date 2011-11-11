module PagesHelper
  
# Get number divs for each season
  def get_divisions(season)
    divs = Division.where( :season_id => season).count
  end
    
# Get division ids for the entire season
  def division_ids(season) 
    ids = Division.where( :season_id => season)
    @divs = Array.new
    ids.each do |p|
      @divs << p.id
    end
  end
# Create the rankings table for everyone
  def show_rankings()
    players = User.all
    rankings = Array.new
    players.each do |r|
      player << r.id
      played = Result.where(:user_id => player).count
      ranking = Ranking.where(:user_id => player).last.id
      rankings << [player,played,ranking]
    end
    return rankings
  end
  
      
# Create the league table for a single division
  def show_league(division_id,league)
    div_id = division_id[:id]
    @div_name = Division.find(div_id).name
    players = Playerdiv.where(:division_id => division_id)
    player = Array.new
    players.each do |p|
      player << p.user_id
    end
    
    l = Array.new
    for k in player
  # Get each players matches
      @matches = player_matches(k,div_id)
      
  # Check if there are any, if not set things to zero
      if @matches.blank?
        played = 0
        @matches = 0
        won = 0
        lost = 0
        drew = 0
        points = 0
      else   
  # Loop through the matches to get points,wins,draws,losses
        points = 0
        won = 0
        lost = 0
        drew = 0 
        
        @matches.each do |m|
          points = points + match_points(m,k)
          @result = match_result(m,k)
          
            if @result == "won"
              won = won + 1
            elsif @result == "lost"
              lost = lost + 1
            else 
              drew = drew + 1
            end
        end
        played = @matches.count

      end

  # Get the players name
      user = User.find(k)
      name = user.name

  # Put it all in an associative array
      l << { :id => user.id, :Name => name, :Played => played, :Won => won, :Lost => lost, :Drew => drew, :Points => points}
    end
    
  # Sort it by league points
    @sorted_league = l.sort_by { |position| position[:Points] }.reverse!
  end

# Get the matches a player has played in a season
  def player_matches(player,playerdiv)
    result = Match.joins(:results).where(:results => {:user_id => player}).where(:playerdiv_id => playerdiv)
    @player_matches = Array.new
    result.each do |m|
      @player_matches << m.id
    end
    return @player_matches
  end
  
# Works out the points for a particular match. 
  def match_points(match,player)
    scores = Result.where(:match_id => match)
    score_1 = scores.first
    score_2 = scores.last
    if score_1[:user_id] == player 
      if score_1[:score] == 3 && score_2[:score] == 2
        points = 6
      elsif score_1[:score] == 3 && score_2[:score] == 1
        points = 6
      elsif score_1[:score] == 3 && score_2[:score] == 0
        points = 7
      elsif score_1[:score] == 2 && score_2[:score] == 3
        points = 3
      elsif score_1[:score] == 1 && score_2[:score] == 3
        points = 2
      elsif score_1[:score] == 0 && score_2[:score] == 3
        points = 1
      elsif score_1[:score] == 2 && score_2[:score] == 0
          points = 5
      elsif score_1[:score] == 2 && score_2[:score] == 1
          points = 5
      elsif score_1[:score] == 1 && score_2[:score] == 2
          points = 2
      elsif score_1[:score] == 0 && score_2[:score] == 2
          points = 1
      elsif score_1[:score] == 2 && score_2[:score] == 2
          points = 4
      elsif score_1[:score] == 1 && score_2[:score] == 0
          points = 4
      elsif score_1[:score] == 0 && score_2[:score] == 1
            points = 1
      elsif score_1[:score] == 1 && score_2[:score] == 1
          points = 3
      elsif score_1[:score] == 0 && score_2[:score] == 0
          points = 2
      elsif score_1[:score] == 3 && score_2[:score] == -1
          points = 7
      elsif score_1[:score] == -1 && score_2[:score] == 3
          points = 0
      end
    elsif score_2[:user_id] == player
      if score_2[:score] == 3 && score_1[:score] == 2
        points = 6
      elsif score_2[:score] == 3 && score_1[:score] == 1
        points = 6
      elsif score_2[:score] == 3 && score_1[:score] == 0
        points = 7
      elsif score_2[:score] == 2 && score_1[:score] == 3
        points = 3
      elsif score_2[:score] == 1 && score_1[:score] == 3
        points = 2
      elsif score_2[:score] == 0 && score_1[:score] == 3
        points = 1
      elsif score_2[:score] == 2 && score_1[:score] == 0
          points = 5
      elsif score_2[:score] == 2 && score_1[:score] == 1
          points = 5
      elsif score_2[:score] == 1 && score_1[:score] == 2
          points = 2
      elsif score_2[:score] == 0 && score_1[:score] == 2
          points = 1
      elsif score_2[:score] == 2 && score_1[:score] == 2
          points = 4
      elsif score_2[:score] == 1 && score_1[:score] == 0
          points = 4
      elsif score_2[:score] == 0 && score_1[:score] == 1
            points = 1
      elsif score_2[:score] == 1 && score_1[:score] == 1
          points = 3
      elsif score_2[:score] == 0 && score_1[:score] == 0
          points = 2
      elsif score_2[:score] == 3 && score_1[:score] == -1
          points = 7
      elsif score_2[:score] == -1 && score_1[:score] == 3
          points = 0
      end
    end
    return points
  end
 
  def get_matches(range)
      matches = Match.joins(:playerdiv).where(:playerdivs => {:division_id => range})
      @match_ids = Array.new
      matches.each do |p|
        @match_ids << p.id
      end
  end

  def get_first_result(match)
    Result.where(:match_id => match).first
  end
  
  def get_second_result(match)
    Result.where(:match_id => match).last
  end
  
# Get user information by id
  def user_name(id)
    name = User.find(id)
  end
end
