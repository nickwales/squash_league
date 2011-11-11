require 'spec_helper'

describe "results/show.html.erb" do
  before(:each) do
    @result = assign(:result, stub_model(Result,
      :match_id => 1,
      :user_id => 1,
      :score => 1,
      :result => "Result",
      :active => "Active",
      :points => 1
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Result/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Active/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
  end
end
