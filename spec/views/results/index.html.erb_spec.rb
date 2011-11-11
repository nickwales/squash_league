require 'spec_helper'

describe "results/index.html.erb" do
  before(:each) do
    assign(:results, [
      stub_model(Result,
        :match_id => 1,
        :user_id => 1,
        :score => 1,
        :result => "Result",
        :active => "Active",
        :points => 1
      ),
      stub_model(Result,
        :match_id => 1,
        :user_id => 1,
        :score => 1,
        :result => "Result",
        :active => "Active",
        :points => 1
      )
    ])
  end

  it "renders a list of results" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Result".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Active".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
  end
end
