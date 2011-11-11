require 'spec_helper'

describe "rankings/new.html.erb" do
  before(:each) do
    assign(:ranking, stub_model(Ranking,
      :score => 1,
      :user_id => 1
    ).as_new_record)
  end

  it "renders new ranking form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => rankings_path, :method => "post" do
      assert_select "input#ranking_score", :name => "ranking[score]"
      assert_select "input#ranking_user_id", :name => "ranking[user_id]"
    end
  end
end
