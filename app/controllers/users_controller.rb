class UsersController < ApplicationController
#  before_filter :authenticate, :only => [:index, :edit, :update]
#  before_filter :correct_user, :only => [:edit, :update]
#  before_filter :require_login
  
  def index
    @title = "All Users"
    @users = User.paginate(:page => params[:page])
  end
  
  def create
    @user = User.new(params[:user])
    if @user.save
      sign_in @user
      flash[:success] = "Welcome to the Sample App!"
      redirect_to @user
    else
      @title = "Sign up"
      render 'new'
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(params[:user])
      flash[:success] = "Profile updated."
      redirect_to @user
    else
      @title = "Edit user"
      render 'edit'
    end
  end

  def show
    @user = User.find(params[:id])
    @results = @user.results.paginate(:page => params[:page])
    @title = @user.name
        
    @current_playerdiv = Playerdiv.where(:user_id => params[:id]).last 
		if !@current_playerdiv.division_id.nil? 
			@division_number = Division.joins(:playerdivs).where(:playerdivs => {:division_id => @current_playerdiv }).last 
    end

   

  end
  


  def new
    @title = "Sign up"
    @user = User.new
  end
  
  def edit
    @title = "Edit User"
    @user = User.find(params[:id])
  end
  
  private

  def authenticate
    deny_access unless signed_in?
  end
    
  def correct_user

    @user = User.find(params[:id])
    redirect_to(root_path) unless current_user?(@user)
 end
  
  def get_last_playerdiv
    @current_playerdiv = Playerdiv.where(:user_id => params[:id]).last
  end
  

end


