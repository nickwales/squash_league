require 'spec_helper'

describe "playerdivs/edit.html.erb" do
  before(:each) do
    @playerdiv = assign(:playerdiv, stub_model(Playerdiv,
      :division_id => 1,
      :user_id => 1
    ))
  end

  it "renders the edit playerdiv form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => playerdivs_path(@playerdiv), :method => "post" do
      assert_select "input#playerdiv_division_id", :name => "playerdiv[division_id]"
      assert_select "input#playerdiv_user_id", :name => "playerdiv[user_id]"
    end
  end
end
