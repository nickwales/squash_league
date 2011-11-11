require 'spec_helper'

describe "divisions/edit.html.erb" do
  before(:each) do
    @division = assign(:division, stub_model(Division,
      :season_id => 1,
      :number => 1
    ))
  end

  it "renders the edit division form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => divisions_path(@division), :method => "post" do
      assert_select "input#division_season_id", :name => "division[season_id]"
      assert_select "input#division_number", :name => "division[number]"
    end
  end
end
