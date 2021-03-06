# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{twitter}
  s.version = "1.7.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.3.6") if s.respond_to? :required_rubygems_version=
  s.authors = ["John Nunemaker", "Wynn Netherland", "Erik Michaels-Ober", "Steve Richert"]
  s.date = %q{2011-09-22 00:00:00.000000000Z}
  s.description = %q{A Ruby wrapper for the Twitter REST and Search APIs}
  s.email = ["nunemaker@gmail.com", "wynn.netherland@gmail.com", "sferik@gmail.com", "steve.richert@gmail.com"]
  s.files = [".gemtest", ".gitignore", ".rspec", ".travis.yml", ".yardopts", "Gemfile", "HISTORY.md", "LICENSE.md", "README.md", "Rakefile", "lib/faraday/request/gateway.rb", "lib/faraday/request/multipart_with_file.rb", "lib/faraday/request/phoenix.rb", "lib/faraday/request/twitter_oauth.rb", "lib/faraday/response/raise_http_4xx.rb", "lib/faraday/response/raise_http_5xx.rb", "lib/twitter.rb", "lib/twitter/api.rb", "lib/twitter/authentication.rb", "lib/twitter/base.rb", "lib/twitter/client.rb", "lib/twitter/client/account.rb", "lib/twitter/client/activity.rb", "lib/twitter/client/block.rb", "lib/twitter/client/direct_messages.rb", "lib/twitter/client/favorites.rb", "lib/twitter/client/friends_and_followers.rb", "lib/twitter/client/friendship.rb", "lib/twitter/client/geo.rb", "lib/twitter/client/help.rb", "lib/twitter/client/legal.rb", "lib/twitter/client/list.rb", "lib/twitter/client/list_members.rb", "lib/twitter/client/list_subscribers.rb", "lib/twitter/client/local_trends.rb", "lib/twitter/client/notification.rb", "lib/twitter/client/saved_searches.rb", "lib/twitter/client/search.rb", "lib/twitter/client/spam_reporting.rb", "lib/twitter/client/timeline.rb", "lib/twitter/client/trends.rb", "lib/twitter/client/tweets.rb", "lib/twitter/client/urls.rb", "lib/twitter/client/user.rb", "lib/twitter/client/utils.rb", "lib/twitter/configuration.rb", "lib/twitter/connection.rb", "lib/twitter/error.rb", "lib/twitter/request.rb", "lib/twitter/search.rb", "lib/twitter/version.rb", "spec/faraday/request_spec.rb", "spec/faraday/response_spec.rb", "spec/fixtures/about_me.json", "spec/fixtures/bad_gateway.json", "spec/fixtures/bad_gateway.xml", "spec/fixtures/bad_request.json", "spec/fixtures/bad_request.xml", "spec/fixtures/by_friends.json", "spec/fixtures/category.json", "spec/fixtures/category.xml", "spec/fixtures/configuration.json", "spec/fixtures/configuration.xml", "spec/fixtures/contributees.json", "spec/fixtures/contributees.xml", "spec/fixtures/contributors.json", "spec/fixtures/contributors.xml", "spec/fixtures/direct_message.json", "spec/fixtures/direct_message.xml", "spec/fixtures/direct_messages.json", "spec/fixtures/direct_messages.xml", "spec/fixtures/end_session.json", "spec/fixtures/end_session.xml", "spec/fixtures/enhance_your_calm.text", "spec/fixtures/false.json", "spec/fixtures/false.xml", "spec/fixtures/favorites.json", "spec/fixtures/favorites.xml", "spec/fixtures/followers.json", "spec/fixtures/followers.xml", "spec/fixtures/forbidden.json", "spec/fixtures/forbidden.xml", "spec/fixtures/friends.json", "spec/fixtures/friends.xml", "spec/fixtures/id_list.json", "spec/fixtures/id_list.xml", "spec/fixtures/ids.json", "spec/fixtures/ids.xml", "spec/fixtures/image_facets.json", "spec/fixtures/image_facets.xml", "spec/fixtures/internal_server_error.json", "spec/fixtures/internal_server_error.xml", "spec/fixtures/languages.json", "spec/fixtures/languages.xml", "spec/fixtures/list.json", "spec/fixtures/list.xml", "spec/fixtures/lists.json", "spec/fixtures/lists.xml", "spec/fixtures/locations.json", "spec/fixtures/locations.xml", "spec/fixtures/matching_trends.json", "spec/fixtures/matching_trends.xml", "spec/fixtures/me.jpeg", "spec/fixtures/media_timeline.json", "spec/fixtures/media_timeline.xml", "spec/fixtures/members.json", "spec/fixtures/members.xml", "spec/fixtures/n605431196_2079896_558_normal.jpg", "spec/fixtures/no_user_matches.json", "spec/fixtures/not_acceptable.json", "spec/fixtures/not_found.json", "spec/fixtures/not_found.xml", "spec/fixtures/pengwynn.json", "spec/fixtures/pengwynn.xml", "spec/fixtures/phoenix_search.phoenix", "spec/fixtures/place.json", "spec/fixtures/places.json", "spec/fixtures/privacy.json", "spec/fixtures/privacy.xml", "spec/fixtures/profile_image.text", "spec/fixtures/rate_limit_status.json", "spec/fixtures/rate_limit_status.xml", "spec/fixtures/recommendations.json", "spec/fixtures/recommendations.xml", "spec/fixtures/relationship.json", "spec/fixtures/relationship.xml", "spec/fixtures/resolve.json", "spec/fixtures/retweet.json", "spec/fixtures/retweet.xml", "spec/fixtures/retweeters_of.json", "spec/fixtures/retweeters_of.xml", "spec/fixtures/retweets.json", "spec/fixtures/retweets.xml", "spec/fixtures/saved_search.json", "spec/fixtures/saved_search.xml", "spec/fixtures/saved_searches.json", "spec/fixtures/saved_searches.xml", "spec/fixtures/search.json", "spec/fixtures/service_unavailable.json", "spec/fixtures/service_unavailable.xml", "spec/fixtures/settings.json", "spec/fixtures/settings.xml", "spec/fixtures/sferik.json", "spec/fixtures/sferik.xml", "spec/fixtures/status.json", "spec/fixtures/status.xml", "spec/fixtures/status_with_media.json", "spec/fixtures/status_with_media.xml", "spec/fixtures/statuses.json", "spec/fixtures/statuses.xml", "spec/fixtures/suggestions.json", "spec/fixtures/suggestions.xml", "spec/fixtures/tos.json", "spec/fixtures/tos.xml", "spec/fixtures/totals.json", "spec/fixtures/totals.xml", "spec/fixtures/trends.json", "spec/fixtures/trends_current.json", "spec/fixtures/trends_daily.json", "spec/fixtures/trends_weekly.json", "spec/fixtures/true.json", "spec/fixtures/true.xml", "spec/fixtures/unauthorized.json", "spec/fixtures/unauthorized.xml", "spec/fixtures/user_search.json", "spec/fixtures/user_search.xml", "spec/fixtures/user_timeline.json", "spec/fixtures/user_timeline.xml", "spec/fixtures/users.json", "spec/fixtures/users.xml", "spec/fixtures/users_list.json", "spec/fixtures/users_list.xml", "spec/fixtures/video_facets.json", "spec/fixtures/video_facets.xml", "spec/fixtures/we_concept_bg2.png", "spec/helper.rb", "spec/twitter/api_spec.rb", "spec/twitter/base_spec.rb", "spec/twitter/client/account_spec.rb", "spec/twitter/client/activity_spec.rb", "spec/twitter/client/block_spec.rb", "spec/twitter/client/direct_messages_spec.rb", "spec/twitter/client/favorites_spec.rb", "spec/twitter/client/friends_and_followers_spec.rb", "spec/twitter/client/friendship_spec.rb", "spec/twitter/client/geo_spec.rb", "spec/twitter/client/help_spec.rb", "spec/twitter/client/legal_spec.rb", "spec/twitter/client/list_members_spec.rb", "spec/twitter/client/list_spec.rb", "spec/twitter/client/list_subscribers_spec.rb", "spec/twitter/client/local_trends_spec.rb", "spec/twitter/client/notification_spec.rb", "spec/twitter/client/saved_searches_spec.rb", "spec/twitter/client/search_spec.rb", "spec/twitter/client/spam_reporting_spec.rb", "spec/twitter/client/timeline_spec.rb", "spec/twitter/client/trends_spec.rb", "spec/twitter/client/tweets_spec.rb", "spec/twitter/client/urls_spec.rb", "spec/twitter/client/user_spec.rb", "spec/twitter/client_spec.rb", "spec/twitter/search_spec.rb", "spec/twitter_spec.rb", "twitter.gemspec"]
  s.homepage = %q{https://github.com/jnunemaker/twitter}
  s.post_install_message = %q{********************************************************************************

 \ Follow @gem on Twitter for announcements, updates, and news.
  https://twitter.com/gem

 \ Join the mailing list!
  https://groups.google.com/group/ruby-twitter-gem

 \ Add your project or organization to the apps wiki!
  https://github.com/jnunemaker/twitter/wiki/apps

********************************************************************************
}
  s.require_paths = ["lib"]
  s.rubygems_version = %q{1.3.6}
  s.summary = %q{Ruby wrapper for the Twitter API}
  s.test_files = ["spec/faraday/request_spec.rb", "spec/faraday/response_spec.rb", "spec/fixtures/about_me.json", "spec/fixtures/bad_gateway.json", "spec/fixtures/bad_gateway.xml", "spec/fixtures/bad_request.json", "spec/fixtures/bad_request.xml", "spec/fixtures/by_friends.json", "spec/fixtures/category.json", "spec/fixtures/category.xml", "spec/fixtures/configuration.json", "spec/fixtures/configuration.xml", "spec/fixtures/contributees.json", "spec/fixtures/contributees.xml", "spec/fixtures/contributors.json", "spec/fixtures/contributors.xml", "spec/fixtures/direct_message.json", "spec/fixtures/direct_message.xml", "spec/fixtures/direct_messages.json", "spec/fixtures/direct_messages.xml", "spec/fixtures/end_session.json", "spec/fixtures/end_session.xml", "spec/fixtures/enhance_your_calm.text", "spec/fixtures/false.json", "spec/fixtures/false.xml", "spec/fixtures/favorites.json", "spec/fixtures/favorites.xml", "spec/fixtures/followers.json", "spec/fixtures/followers.xml", "spec/fixtures/forbidden.json", "spec/fixtures/forbidden.xml", "spec/fixtures/friends.json", "spec/fixtures/friends.xml", "spec/fixtures/id_list.json", "spec/fixtures/id_list.xml", "spec/fixtures/ids.json", "spec/fixtures/ids.xml", "spec/fixtures/image_facets.json", "spec/fixtures/image_facets.xml", "spec/fixtures/internal_server_error.json", "spec/fixtures/internal_server_error.xml", "spec/fixtures/languages.json", "spec/fixtures/languages.xml", "spec/fixtures/list.json", "spec/fixtures/list.xml", "spec/fixtures/lists.json", "spec/fixtures/lists.xml", "spec/fixtures/locations.json", "spec/fixtures/locations.xml", "spec/fixtures/matching_trends.json", "spec/fixtures/matching_trends.xml", "spec/fixtures/me.jpeg", "spec/fixtures/media_timeline.json", "spec/fixtures/media_timeline.xml", "spec/fixtures/members.json", "spec/fixtures/members.xml", "spec/fixtures/n605431196_2079896_558_normal.jpg", "spec/fixtures/no_user_matches.json", "spec/fixtures/not_acceptable.json", "spec/fixtures/not_found.json", "spec/fixtures/not_found.xml", "spec/fixtures/pengwynn.json", "spec/fixtures/pengwynn.xml", "spec/fixtures/phoenix_search.phoenix", "spec/fixtures/place.json", "spec/fixtures/places.json", "spec/fixtures/privacy.json", "spec/fixtures/privacy.xml", "spec/fixtures/profile_image.text", "spec/fixtures/rate_limit_status.json", "spec/fixtures/rate_limit_status.xml", "spec/fixtures/recommendations.json", "spec/fixtures/recommendations.xml", "spec/fixtures/relationship.json", "spec/fixtures/relationship.xml", "spec/fixtures/resolve.json", "spec/fixtures/retweet.json", "spec/fixtures/retweet.xml", "spec/fixtures/retweeters_of.json", "spec/fixtures/retweeters_of.xml", "spec/fixtures/retweets.json", "spec/fixtures/retweets.xml", "spec/fixtures/saved_search.json", "spec/fixtures/saved_search.xml", "spec/fixtures/saved_searches.json", "spec/fixtures/saved_searches.xml", "spec/fixtures/search.json", "spec/fixtures/service_unavailable.json", "spec/fixtures/service_unavailable.xml", "spec/fixtures/settings.json", "spec/fixtures/settings.xml", "spec/fixtures/sferik.json", "spec/fixtures/sferik.xml", "spec/fixtures/status.json", "spec/fixtures/status.xml", "spec/fixtures/status_with_media.json", "spec/fixtures/status_with_media.xml", "spec/fixtures/statuses.json", "spec/fixtures/statuses.xml", "spec/fixtures/suggestions.json", "spec/fixtures/suggestions.xml", "spec/fixtures/tos.json", "spec/fixtures/tos.xml", "spec/fixtures/totals.json", "spec/fixtures/totals.xml", "spec/fixtures/trends.json", "spec/fixtures/trends_current.json", "spec/fixtures/trends_daily.json", "spec/fixtures/trends_weekly.json", "spec/fixtures/true.json", "spec/fixtures/true.xml", "spec/fixtures/unauthorized.json", "spec/fixtures/unauthorized.xml", "spec/fixtures/user_search.json", "spec/fixtures/user_search.xml", "spec/fixtures/user_timeline.json", "spec/fixtures/user_timeline.xml", "spec/fixtures/users.json", "spec/fixtures/users.xml", "spec/fixtures/users_list.json", "spec/fixtures/users_list.xml", "spec/fixtures/video_facets.json", "spec/fixtures/video_facets.xml", "spec/fixtures/we_concept_bg2.png", "spec/helper.rb", "spec/twitter/api_spec.rb", "spec/twitter/base_spec.rb", "spec/twitter/client/account_spec.rb", "spec/twitter/client/activity_spec.rb", "spec/twitter/client/block_spec.rb", "spec/twitter/client/direct_messages_spec.rb", "spec/twitter/client/favorites_spec.rb", "spec/twitter/client/friends_and_followers_spec.rb", "spec/twitter/client/friendship_spec.rb", "spec/twitter/client/geo_spec.rb", "spec/twitter/client/help_spec.rb", "spec/twitter/client/legal_spec.rb", "spec/twitter/client/list_members_spec.rb", "spec/twitter/client/list_spec.rb", "spec/twitter/client/list_subscribers_spec.rb", "spec/twitter/client/local_trends_spec.rb", "spec/twitter/client/notification_spec.rb", "spec/twitter/client/saved_searches_spec.rb", "spec/twitter/client/search_spec.rb", "spec/twitter/client/spam_reporting_spec.rb", "spec/twitter/client/timeline_spec.rb", "spec/twitter/client/trends_spec.rb", "spec/twitter/client/tweets_spec.rb", "spec/twitter/client/urls_spec.rb", "spec/twitter/client/user_spec.rb", "spec/twitter/client_spec.rb", "spec/twitter/search_spec.rb", "spec/twitter_spec.rb"]

  if s.respond_to? :specification_version then
    current_version = Gem::Specification::CURRENT_SPECIFICATION_VERSION
    s.specification_version = 3

    if Gem::Version.new(Gem::RubyGemsVersion) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<hashie>, ["~> 1.1.0"])
      s.add_runtime_dependency(%q<faraday>, ["~> 0.7.4"])
      s.add_runtime_dependency(%q<faraday_middleware>, ["~> 0.7.0"])
      s.add_runtime_dependency(%q<multi_json>, ["~> 1.0.0"])
      s.add_runtime_dependency(%q<multi_xml>, ["~> 0.4.0"])
      s.add_runtime_dependency(%q<simple_oauth>, ["~> 0.1.5"])
      s.add_development_dependency(%q<nokogiri>, ["~> 1.4"])
      s.add_development_dependency(%q<rake>, ["~> 0.9"])
      s.add_development_dependency(%q<rdiscount>, ["~> 1.6"])
      s.add_development_dependency(%q<rspec>, ["~> 2.6"])
      s.add_development_dependency(%q<simplecov>, ["~> 0.4"])
      s.add_development_dependency(%q<webmock>, ["~> 1.7"])
      s.add_development_dependency(%q<yard>, ["~> 0.7"])
    else
      s.add_dependency(%q<hashie>, ["~> 1.1.0"])
      s.add_dependency(%q<faraday>, ["~> 0.7.4"])
      s.add_dependency(%q<faraday_middleware>, ["~> 0.7.0"])
      s.add_dependency(%q<multi_json>, ["~> 1.0.0"])
      s.add_dependency(%q<multi_xml>, ["~> 0.4.0"])
      s.add_dependency(%q<simple_oauth>, ["~> 0.1.5"])
      s.add_dependency(%q<nokogiri>, ["~> 1.4"])
      s.add_dependency(%q<rake>, ["~> 0.9"])
      s.add_dependency(%q<rdiscount>, ["~> 1.6"])
      s.add_dependency(%q<rspec>, ["~> 2.6"])
      s.add_dependency(%q<simplecov>, ["~> 0.4"])
      s.add_dependency(%q<webmock>, ["~> 1.7"])
      s.add_dependency(%q<yard>, ["~> 0.7"])
    end
  else
    s.add_dependency(%q<hashie>, ["~> 1.1.0"])
    s.add_dependency(%q<faraday>, ["~> 0.7.4"])
    s.add_dependency(%q<faraday_middleware>, ["~> 0.7.0"])
    s.add_dependency(%q<multi_json>, ["~> 1.0.0"])
    s.add_dependency(%q<multi_xml>, ["~> 0.4.0"])
    s.add_dependency(%q<simple_oauth>, ["~> 0.1.5"])
    s.add_dependency(%q<nokogiri>, ["~> 1.4"])
    s.add_dependency(%q<rake>, ["~> 0.9"])
    s.add_dependency(%q<rdiscount>, ["~> 1.6"])
    s.add_dependency(%q<rspec>, ["~> 2.6"])
    s.add_dependency(%q<simplecov>, ["~> 0.4"])
    s.add_dependency(%q<webmock>, ["~> 1.7"])
    s.add_dependency(%q<yard>, ["~> 0.7"])
  end
end
