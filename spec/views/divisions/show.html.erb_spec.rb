require 'spec_helper'

describe "divisions/show.html.erb" do
  before(:each) do
    @division = assign(:division, stub_model(Division,
      :season_id => 1,
      :number => 1
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
  end
end
