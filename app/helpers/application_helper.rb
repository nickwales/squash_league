module ApplicationHelper


 def logo
  base_logo = image_tag("logo.png", :alt => "Sample App", :class => "round")
 end
 
# Return a title on a per-page basis
 def title
  base_title = "This is the title"
  if @title.nil?
   base_title
  else 
   "#{base_title} | #{@title}"
  end
 end 

 # Get the matches a player has played in a season
 def all_player_matches(player)
   result = Match.joins(:results).where(:results => {:user_id => player})
   @player_matches = Array.new
   result.each do |m|
     @player_matches << m.id
   end
   return @player_matches
 end
end




def match_result(match,player)
  scores = Result.where(:match_id => match)
     score_1 = scores.first
     score_2 = scores.last
     if score_1[:user_id] == player
       if score_1[:score] > score_2[:score]
         result = "won"
       elsif score_1[:score] == score_2[:score]
         result = "drew"       
       elsif score_1[:score] < score_2[:score]
         result = "lost"
         end
      elsif score_2[:user_id] == player
        if score_2[:score] > score_1[:score]
          result = "won"
        elsif score_2[:score] == score_1[:score]
          result = "drew"       
        elsif score_2[:score] < score_1[:score]
          result = "lost"
        end
      return result
      end
    end

# Get players from current playerdiv
def playerdiv_users(playerdiv)
  users = Hash.new
  results = User.joins(:playerdivs).where(:playerdivs => {:division_id => playerdiv})
  results.each do |r|
    users[r.name] = r.id
  end
  return users
end
  
# Get players from current playerdiv
def other_playerdiv_users(playerdiv,user_id)
  users = Hash.new
  results = User.joins(:playerdivs).where(:playerdivs => {:division_id => playerdiv}).where("users.id != ?", user_id)
  results.each do |r|
    users[r.name] = r.id
  end
  return users
end  

# Get current playerdiv by id
def get_playerdiv()
  playerdiv = Playerdiv.where(:user_id => current_user).last
  return playerdiv
end

# Get current playerdiv by id
def get_playerdiv_by_id(id)
  current_season = current_season()
  playerdiv = Playerdiv.joins(:division).where(:divisions => {:season_id => current_season }).where(:playerdivs => {:user_id => id})
  return playerdiv
end


def user_by_id(id)
    user = User.find(id)
    return user
  end


def current_season()
	now = Date.today
    Season.all.each do |s|
      if Date.today >= s.start_date && Date.today <= s.end_date
        return s.id
	    else
       season = 0
  	  end
    end
  end 

def wanker(div_id)
  playerdivs = Array.new
  Playerdiv.where(:division_id => div_id).each do |p|
    playerdivs << p
  end
  return playerdivs
end

def current_divisions()
  div = Array.new
  curr_season = current_season()
  Division.where(:season_id => curr_season).each do |d|
    div << d.id
  end
  return div
end



  def twitter_auth()
     Twitter.configure do |config|
       config.consumer_key = "MmLpCfZryJpziDQrP6v2fA"
       config.consumer_secret = "r1JnVOv0fqpKWf85PYy7NqIeujLlso7Rz77dMBz0GJM"
       config.oauth_token = "304956678-t1zBhgd9WPsLt2iPziMtMJUky7N67At8sBJOLVtE"
       config.oauth_token_secret = "S1Y9hkH9Sx9HOvXHzFDpceX1JyNZjKveaWmUl0QaMQ"
     end
   end
   def tweet_result(player1, player1_score, player2, player2_score)
     twitter_auth()
     # Create the tweet

     tweet = ["Result just in, ", player1, " ", player1_score, " - ", player2_score, " ",player2].join("")
     # Initialize your Twitter client
     client = Twitter::Client.new
     # Post a status update
     client.update(tweet)
   end