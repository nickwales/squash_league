require 'spec_helper'

describe "seasons/index.html.erb" do
  before(:each) do
    assign(:seasons, [
      stub_model(Season),
      stub_model(Season)
    ])
  end

  it "renders a list of seasons" do
    render
  end
end
