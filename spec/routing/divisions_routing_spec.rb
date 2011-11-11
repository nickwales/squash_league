require "spec_helper"

describe DivisionsController do
  describe "routing" do

    it "routes to #index" do
      get("/divisions").should route_to("divisions#index")
    end

    it "routes to #new" do
      get("/divisions/new").should route_to("divisions#new")
    end

    it "routes to #show" do
      get("/divisions/1").should route_to("divisions#show", :id => "1")
    end

    it "routes to #edit" do
      get("/divisions/1/edit").should route_to("divisions#edit", :id => "1")
    end

    it "routes to #create" do
      post("/divisions").should route_to("divisions#create")
    end

    it "routes to #update" do
      put("/divisions/1").should route_to("divisions#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/divisions/1").should route_to("divisions#destroy", :id => "1")
    end

  end
end
