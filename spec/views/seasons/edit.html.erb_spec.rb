require 'spec_helper'

describe "seasons/edit.html.erb" do
  before(:each) do
    @season = assign(:season, stub_model(Season))
  end

  it "renders the edit season form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => seasons_path(@season), :method => "post" do
    end
  end
end
