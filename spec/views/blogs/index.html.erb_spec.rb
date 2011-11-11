require 'spec_helper'

describe "blogs/index.html.erb" do
  before(:each) do
    assign(:blogs, [
      stub_model(Blog,
        :title => "Title",
        :summary => "Summary",
        :contents => "Contents",
        :author => 1
      ),
      stub_model(Blog,
        :title => "Title",
        :summary => "Summary",
        :contents => "Contents",
        :author => 1
      )
    ])
  end

  it "renders a list of blogs" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Summary".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Contents".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
  end
end
