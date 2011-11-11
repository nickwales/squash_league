require "spec_helper"

describe PlayerdivsController do
  describe "routing" do

    it "routes to #index" do
      get("/playerdivs").should route_to("playerdivs#index")
    end

    it "routes to #new" do
      get("/playerdivs/new").should route_to("playerdivs#new")
    end

    it "routes to #show" do
      get("/playerdivs/1").should route_to("playerdivs#show", :id => "1")
    end

    it "routes to #edit" do
      get("/playerdivs/1/edit").should route_to("playerdivs#edit", :id => "1")
    end

    it "routes to #create" do
      post("/playerdivs").should route_to("playerdivs#create")
    end

    it "routes to #update" do
      put("/playerdivs/1").should route_to("playerdivs#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/playerdivs/1").should route_to("playerdivs#destroy", :id => "1")
    end

  end
end
