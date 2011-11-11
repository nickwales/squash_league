require 'spec_helper'

describe "rankings/show.html.erb" do
  before(:each) do
    @ranking = assign(:ranking, stub_model(Ranking,
      :score => 1,
      :user_id => 1
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
