require 'spec_helper'

describe "seasons/show.html.erb" do
  before(:each) do
    @season = assign(:season, stub_model(Season))
  end

  it "renders attributes in <p>" do
    render
  end
end
