 class ApplicationController < ActionController::Base
  protect_from_forgery
  include SessionsHelper
  
  def user_name(id)
    name = User.find(id)
  end
  
  def update_elo_score(winner,loser)
    #Create new variables with existing ELO scores. We post this in winner order rather than have to do everything twice.
      win1 = winner.to_i
      los1 = loser.to_i
      unless Ranking.where(:user_id => winner)
        p1 = Elo::Player.new(:rating => 1000)
      else
        p1 = Elo::Player.new(:rating => Ranking.where(:user_id => winner).last.score)
      end
      unless Ranking.where(:user_id => loser)
        p2 = Elo::Player.new(:rating => 1000)
      else
        p2 = Elo::Player.new(:rating => Ranking.where(:user_id => loser).last.score)

      end
      game = p1.versus(p2)
      game.winner = p1
      p1_rating = p1.rating
      p2_rating = p2.rating
      
      elo_scores = [p1_rating,p2_rating]
      return elo_scores
    end



      def require_login
        unless current_user
          redirect_to root_path
        end
      end
      
 
      

end
