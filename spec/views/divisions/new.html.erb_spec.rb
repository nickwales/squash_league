require 'spec_helper'

describe "divisions/new.html.erb" do
  before(:each) do
    assign(:division, stub_model(Division,
      :season_id => 1,
      :number => 1
    ).as_new_record)
  end

  it "renders new division form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => divisions_path, :method => "post" do
      assert_select "input#division_season_id", :name => "division[season_id]"
      assert_select "input#division_number", :name => "division[number]"
    end
  end
end
