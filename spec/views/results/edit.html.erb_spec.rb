require 'spec_helper'

describe "results/edit.html.erb" do
  before(:each) do
    @result = assign(:result, stub_model(Result,
      :match_id => 1,
      :user_id => 1,
      :score => 1,
      :result => "MyString",
      :active => "MyString",
      :points => 1
    ))
  end

  it "renders the edit result form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => results_path(@result), :method => "post" do
      assert_select "input#result_match_id", :name => "result[match_id]"
      assert_select "input#result_user_id", :name => "result[user_id]"
      assert_select "input#result_score", :name => "result[score]"
      assert_select "input#result_result", :name => "result[result]"
      assert_select "input#result_active", :name => "result[active]"
      assert_select "input#result_points", :name => "result[points]"
    end
  end
end
