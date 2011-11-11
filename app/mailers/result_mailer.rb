class ResultMailer < ActionMailer::Base
  default :from => "results@tomjohnleague.co.uk"
  
  def result_email(player1,player2,player1_score,player2_score)
    player1_email = User.find(player1).email
    player2_email = User.find(player2).email

    if player1_score > player2_score 
      @result = "true"
      @winner = User.find(player1).name
      @loser = User.find(player2).name
      @winner_score = player1_score
      @loser_score = player2_score
    elsif player1_score < player2_score 
      @result = "true"
      @winner = User.find(player2).name
      @loser = User.find(player1).name
      @winner_score = player2_score
      @loser_score = player1_score
    else
      @result = "false"
    end
      mail(:to => [player1_email,player2_email,"results@tomjohnleague.co.uk"], :subject => "Squash Result")
    end
end
