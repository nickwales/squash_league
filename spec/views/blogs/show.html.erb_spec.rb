require 'spec_helper'

describe "blogs/show.html.erb" do
  before(:each) do
    @blog = assign(:blog, stub_model(Blog,
      :title => "Title",
      :summary => "Summary",
      :contents => "Contents",
      :author => 1
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Title/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Summary/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Contents/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
  end
end
