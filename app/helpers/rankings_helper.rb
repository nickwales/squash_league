module RankingsHelper

  def current_score(id)
    current_score = Ranking.where(:user_id => id).last.score
    return current_score
  end

  def games_played(id)
    games_played = Result.where(:user_id => id).count
    return games_played
  end
  
  def high_score(id)
    high_score = Ranking.where(:user_id => id).maximum("score")
    return high_score
  end
  
  def games_won(id)
    games_won = Result.where(:user_id => id).where(:result => 3).count
    return games_won
  end
    
end