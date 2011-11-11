module UsersHelper

def gravatar_for(user, options = { :size => 50 })
    gravatar_image_tag(user.email.downcase, :alt => user.name,
                                            :class => 'gravatar',
                                            :gravatar => options)
end

def user_by_id(id)
  user = User.find(id)
  return user
end
  
def show_users_matches(number_of_matches)
  @results = Array.new
  r = Result.where(:user_id => params[:id]).last(number_of_matches)
  r.each do |m|
    @results << Result.where(:match_id => m[:match_id])
  end
  return @results
end

end
