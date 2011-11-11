class PlayerdivsController < ApplicationController
  # GET /playerdivs
  # GET /playerdivs.xml
  def index
    @playerdivs = Playerdiv.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @playerdivs }
    end
  end

  # GET /playerdivs/1
  # GET /playerdivs/1.xml
  def show
    @playerdiv = Playerdiv.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @playerdiv }
    end
  end

  # GET /playerdivs/new
  # GET /playerdivs/new.xml
  def new
    @playerdiv = Playerdiv.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @playerdiv }
    end
  end

  # GET /playerdivs/1/edit
  def edit
    @playerdiv = Playerdiv.find(params[:id])
  end

  # POST /playerdivs
  # POST /playerdivs.xml
  def create
    @playerdiv = Playerdiv.new(params[:playerdiv])

    respond_to do |format|
      if @playerdiv.save
        format.html { redirect_to(@playerdiv, :notice => 'Playerdiv was successfully created.') }
        format.xml  { render :xml => @playerdiv, :status => :created, :location => @playerdiv }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @playerdiv.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /playerdivs/1
  # PUT /playerdivs/1.xml
  def update
    @playerdiv = Playerdiv.find(params[:id])

    respond_to do |format|
      if @playerdiv.update_attributes(params[:playerdiv])
        format.html { redirect_to(@playerdiv, :notice => 'Playerdiv was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @playerdiv.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /playerdivs/1
  # DELETE /playerdivs/1.xml
  def destroy
    @playerdiv = Playerdiv.find(params[:id])
    @playerdiv.destroy

    respond_to do |format|
      format.html { redirect_to(playerdivs_url) }
      format.xml  { head :ok }
    end
  end
end
