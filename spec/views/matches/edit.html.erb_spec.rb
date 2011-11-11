require 'spec_helper'

describe "matches/edit.html.erb" do
  before(:each) do
    @match = assign(:match, stub_model(Match,
      :playerdiv_id => 1
    ))
  end

  it "renders the edit match form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => matches_path(@match), :method => "post" do
      assert_select "input#match_playerdiv_id", :name => "match[playerdiv_id]"
    end
  end
end
