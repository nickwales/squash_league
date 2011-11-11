require 'spec_helper'

describe "playerdivs/show.html.erb" do
  before(:each) do
    @playerdiv = assign(:playerdiv, stub_model(Playerdiv,
      :division_id => 1,
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
