# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{twitter}
  s.version = "2.0.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.3.6") if s.respond_to? :required_rubygems_version=
  s.authors = ["John Nunemaker", "Wynn Netherland", "Erik Michaels-Ober", "Steve Richert"]
  s.date = %q{2011-12-02 00:00:00.000000000Z}
  s.description = %q{A Ruby wrapper for the Twitter API.}
  s.email = ["nunemaker@gmail.com", "wynn.netherland@gmail.com", "sferik@gmail.com", "steve.richert@gmail.com"]
  s.files = [".gemtest", ".gitignore", ".rspec", ".travis.yml", ".yardopts", "Gemfile", "HISTORY.md", "LICENSE.md", "README.md", "Rakefile", "lib/twitter.rb", "lib/twitter/action.rb", "lib/twitter/action_factory.rb", "lib/twitter/authenticatable.rb", "lib/twitter/base.rb", "lib/twitter/client.rb", "lib/twitter/client/accounts.rb", "lib/twitter/client/activity.rb", "lib/twitter/client/block.rb", "lib/twitter/client/direct_messages.rb", "lib/twitter/client/favorites.rb", "lib/twitter/client/friends_and_followers.rb", "lib/twitter/client/help.rb", "lib/twitter/client/legal.rb", "lib/twitter/client/lists.rb", "lib/twitter/client/local_trends.rb", "lib/twitter/client/notification.rb", "lib/twitter/client/places_and_geo.rb", "lib/twitter/client/saved_searches.rb", "lib/twitter/client/search.rb", "lib/twitter/client/spam_reporting.rb", "lib/twitter/client/suggested_users.rb", "lib/twitter/client/timelines.rb", "lib/twitter/client/trends.rb", "lib/twitter/client/tweets.rb", "lib/twitter/client/urls.rb", "lib/twitter/client/users.rb", "lib/twitter/config.rb", "lib/twitter/configuration.rb", "lib/twitter/connection.rb", "lib/twitter/core_ext/hash.rb", "lib/twitter/creatable.rb", "lib/twitter/cursor.rb", "lib/twitter/direct_message.rb", "lib/twitter/error.rb", "lib/twitter/error/bad_gateway.rb", "lib/twitter/error/bad_request.rb", "lib/twitter/error/client_error.rb", "lib/twitter/error/enhance_your_calm.rb", "lib/twitter/error/forbidden.rb", "lib/twitter/error/internal_server_error.rb", "lib/twitter/error/not_acceptable.rb", "lib/twitter/error/not_found.rb", "lib/twitter/error/server_error.rb", "lib/twitter/error/service_unavailable.rb", "lib/twitter/error/unauthorized.rb", "lib/twitter/favorite.rb", "lib/twitter/follow.rb", "lib/twitter/geo_factory.rb", "lib/twitter/language.rb", "lib/twitter/list.rb", "lib/twitter/media_factory.rb", "lib/twitter/mention.rb", "lib/twitter/metadata.rb", "lib/twitter/photo.rb", "lib/twitter/place.rb", "lib/twitter/point.rb", "lib/twitter/polygon.rb", "lib/twitter/rate_limit_status.rb", "lib/twitter/relationship.rb", "lib/twitter/reply.rb", "lib/twitter/request.rb", "lib/twitter/request/gateway.rb", "lib/twitter/request/multipart_with_file.rb", "lib/twitter/request/oauth.rb", "lib/twitter/request/phoenix.rb", "lib/twitter/response/parse_json.rb", "lib/twitter/response/raise_client_error.rb", "lib/twitter/response/raise_server_error.rb", "lib/twitter/retweet.rb", "lib/twitter/saved_search.rb", "lib/twitter/settings.rb", "lib/twitter/size.rb", "lib/twitter/status.rb", "lib/twitter/suggestion.rb", "lib/twitter/trend.rb", "lib/twitter/user.rb", "lib/twitter/version.rb", "spec/faraday/request_spec.rb", "spec/faraday/response_spec.rb", "spec/fixtures/about_me.json", "spec/fixtures/all.json", "spec/fixtures/bad_gateway.json", "spec/fixtures/bad_request.json", "spec/fixtures/by_friends.json", "spec/fixtures/category.json", "spec/fixtures/configuration.json", "spec/fixtures/contributees.json", "spec/fixtures/contributors.json", "spec/fixtures/direct_message.json", "spec/fixtures/direct_messages.json", "spec/fixtures/end_session.json", "spec/fixtures/enhance_your_calm.text", "spec/fixtures/false.json", "spec/fixtures/favorites.json", "spec/fixtures/forbidden.json", "spec/fixtures/friendships.json", "spec/fixtures/id_list.json", "spec/fixtures/ids.json", "spec/fixtures/image_facets.json", "spec/fixtures/internal_server_error.json", "spec/fixtures/languages.json", "spec/fixtures/list.json", "spec/fixtures/lists.json", "spec/fixtures/locations.json", "spec/fixtures/matching_trends.json", "spec/fixtures/me.jpeg", "spec/fixtures/media_timeline.json", "spec/fixtures/members.json", "spec/fixtures/n605431196_2079896_558_normal.jpg", "spec/fixtures/no_user_matches.json", "spec/fixtures/not_acceptable.json", "spec/fixtures/not_found.json", "spec/fixtures/pengwynn.json", "spec/fixtures/phoenix_search.phoenix", "spec/fixtures/place.json", "spec/fixtures/places.json", "spec/fixtures/privacy.json", "spec/fixtures/profile_image.text", "spec/fixtures/rate_limit_status.json", "spec/fixtures/recommendations.json", "spec/fixtures/relationship.json", "spec/fixtures/resolve.json", "spec/fixtures/retweet.json", "spec/fixtures/retweeters_of.json", "spec/fixtures/retweets.json", "spec/fixtures/saved_search.json", "spec/fixtures/saved_searches.json", "spec/fixtures/search.json", "spec/fixtures/service_unavailable.json", "spec/fixtures/settings.json", "spec/fixtures/sferik.json", "spec/fixtures/status.json", "spec/fixtures/status_with_media.json", "spec/fixtures/statuses.json", "spec/fixtures/suggestions.json", "spec/fixtures/tos.json", "spec/fixtures/totals.json", "spec/fixtures/trends.json", "spec/fixtures/trends_current.json", "spec/fixtures/trends_daily.json", "spec/fixtures/trends_weekly.json", "spec/fixtures/true.json", "spec/fixtures/unauthorized.json", "spec/fixtures/user_search.json", "spec/fixtures/user_timeline.json", "spec/fixtures/users.json", "spec/fixtures/users_list.json", "spec/fixtures/video_facets.json", "spec/fixtures/we_concept_bg2.png", "spec/helper.rb", "spec/twitter/action_factory_spec.rb", "spec/twitter/action_spec.rb", "spec/twitter/base_spec.rb", "spec/twitter/client/accounts_spec.rb", "spec/twitter/client/activity_spec.rb", "spec/twitter/client/block_spec.rb", "spec/twitter/client/direct_messages_spec.rb", "spec/twitter/client/favorites_spec.rb", "spec/twitter/client/friends_and_followers_spec.rb", "spec/twitter/client/help_spec.rb", "spec/twitter/client/legal_spec.rb", "spec/twitter/client/lists_spec.rb", "spec/twitter/client/local_trends_spec.rb", "spec/twitter/client/notification_spec.rb", "spec/twitter/client/places_and_geo_spec.rb", "spec/twitter/client/saved_searches_spec.rb", "spec/twitter/client/search_spec.rb", "spec/twitter/client/spam_reporting_spec.rb", "spec/twitter/client/suggested_users_spec.rb", "spec/twitter/client/timelines_spec.rb", "spec/twitter/client/trends_spec.rb", "spec/twitter/client/tweets_spec.rb", "spec/twitter/client/urls_spec.rb", "spec/twitter/client/users_spec.rb", "spec/twitter/client_spec.rb", "spec/twitter/configuration_spec.rb", "spec/twitter/cursor_spec.rb", "spec/twitter/direct_message_spec.rb", "spec/twitter/favorite_spec.rb", "spec/twitter/follow_spec.rb", "spec/twitter/geo_factory_spec.rb", "spec/twitter/list_spec.rb", "spec/twitter/media_factory_spec.rb", "spec/twitter/mention_spec.rb", "spec/twitter/photo_spec.rb", "spec/twitter/place_spec.rb", "spec/twitter/point_spec.rb", "spec/twitter/polygon_spec.rb", "spec/twitter/rate_limit_status_spec.rb", "spec/twitter/relationship_spec.rb", "spec/twitter/reply_spec.rb", "spec/twitter/retweet_spec.rb", "spec/twitter/saved_search_spec.rb", "spec/twitter/settings_spec.rb", "spec/twitter/size_spec.rb", "spec/twitter/status_spec.rb", "spec/twitter/suggestion_spec.rb", "spec/twitter/trend_spec.rb", "spec/twitter/user_spec.rb", "spec/twitter_spec.rb", "twitter.gemspec"]
  s.homepage = %q{https://github.com/jnunemaker/twitter}
  s.post_install_message = %q{********************************************************************************

 \ You should follow @gem on Twitter for announcements and updates about the gem.
 \ https://twitter.com/gem

  Please direct any questions about the library to the mailing list.
  https://groups.google.com/group/ruby-twitter-gem

  Does your project or organization use this gem? Add it to the apps wiki!
  https://github.com/jnunemaker/twitter/wiki/apps

********************************************************************************
}
  s.require_paths = ["lib"]
  s.rubygems_version = %q{1.3.6}
  s.summary = %q{Twitter API wrapper}
  s.test_files = ["spec/faraday/request_spec.rb", "spec/faraday/response_spec.rb", "spec/fixtures/about_me.json", "spec/fixtures/all.json", "spec/fixtures/bad_gateway.json", "spec/fixtures/bad_request.json", "spec/fixtures/by_friends.json", "spec/fixtures/category.json", "spec/fixtures/configuration.json", "spec/fixtures/contributees.json", "spec/fixtures/contributors.json", "spec/fixtures/direct_message.json", "spec/fixtures/direct_messages.json", "spec/fixtures/end_session.json", "spec/fixtures/enhance_your_calm.text", "spec/fixtures/false.json", "spec/fixtures/favorites.json", "spec/fixtures/forbidden.json", "spec/fixtures/friendships.json", "spec/fixtures/id_list.json", "spec/fixtures/ids.json", "spec/fixtures/image_facets.json", "spec/fixtures/internal_server_error.json", "spec/fixtures/languages.json", "spec/fixtures/list.json", "spec/fixtures/lists.json", "spec/fixtures/locations.json", "spec/fixtures/matching_trends.json", "spec/fixtures/me.jpeg", "spec/fixtures/media_timeline.json", "spec/fixtures/members.json", "spec/fixtures/n605431196_2079896_558_normal.jpg", "spec/fixtures/no_user_matches.json", "spec/fixtures/not_acceptable.json", "spec/fixtures/not_found.json", "spec/fixtures/pengwynn.json", "spec/fixtures/phoenix_search.phoenix", "spec/fixtures/place.json", "spec/fixtures/places.json", "spec/fixtures/privacy.json", "spec/fixtures/profile_image.text", "spec/fixtures/rate_limit_status.json", "spec/fixtures/recommendations.json", "spec/fixtures/relationship.json", "spec/fixtures/resolve.json", "spec/fixtures/retweet.json", "spec/fixtures/retweeters_of.json", "spec/fixtures/retweets.json", "spec/fixtures/saved_search.json", "spec/fixtures/saved_searches.json", "spec/fixtures/search.json", "spec/fixtures/service_unavailable.json", "spec/fixtures/settings.json", "spec/fixtures/sferik.json", "spec/fixtures/status.json", "spec/fixtures/status_with_media.json", "spec/fixtures/statuses.json", "spec/fixtures/suggestions.json", "spec/fixtures/tos.json", "spec/fixtures/totals.json", "spec/fixtures/trends.json", "spec/fixtures/trends_current.json", "spec/fixtures/trends_daily.json", "spec/fixtures/trends_weekly.json", "spec/fixtures/true.json", "spec/fixtures/unauthorized.json", "spec/fixtures/user_search.json", "spec/fixtures/user_timeline.json", "spec/fixtures/users.json", "spec/fixtures/users_list.json", "spec/fixtures/video_facets.json", "spec/fixtures/we_concept_bg2.png", "spec/helper.rb", "spec/twitter/action_factory_spec.rb", "spec/twitter/action_spec.rb", "spec/twitter/base_spec.rb", "spec/twitter/client/accounts_spec.rb", "spec/twitter/client/activity_spec.rb", "spec/twitter/client/block_spec.rb", "spec/twitter/client/direct_messages_spec.rb", "spec/twitter/client/favorites_spec.rb", "spec/twitter/client/friends_and_followers_spec.rb", "spec/twitter/client/help_spec.rb", "spec/twitter/client/legal_spec.rb", "spec/twitter/client/lists_spec.rb", "spec/twitter/client/local_trends_spec.rb", "spec/twitter/client/notification_spec.rb", "spec/twitter/client/places_and_geo_spec.rb", "spec/twitter/client/saved_searches_spec.rb", "spec/twitter/client/search_spec.rb", "spec/twitter/client/spam_reporting_spec.rb", "spec/twitter/client/suggested_users_spec.rb", "spec/twitter/client/timelines_spec.rb", "spec/twitter/client/trends_spec.rb", "spec/twitter/client/tweets_spec.rb", "spec/twitter/client/urls_spec.rb", "spec/twitter/client/users_spec.rb", "spec/twitter/client_spec.rb", "spec/twitter/configuration_spec.rb", "spec/twitter/cursor_spec.rb", "spec/twitter/direct_message_spec.rb", "spec/twitter/favorite_spec.rb", "spec/twitter/follow_spec.rb", "spec/twitter/geo_factory_spec.rb", "spec/twitter/list_spec.rb", "spec/twitter/media_factory_spec.rb", "spec/twitter/mention_spec.rb", "spec/twitter/photo_spec.rb", "spec/twitter/place_spec.rb", "spec/twitter/point_spec.rb", "spec/twitter/polygon_spec.rb", "spec/twitter/rate_limit_status_spec.rb", "spec/twitter/relationship_spec.rb", "spec/twitter/reply_spec.rb", "spec/twitter/retweet_spec.rb", "spec/twitter/saved_search_spec.rb", "spec/twitter/settings_spec.rb", "spec/twitter/size_spec.rb", "spec/twitter/status_spec.rb", "spec/twitter/suggestion_spec.rb", "spec/twitter/trend_spec.rb", "spec/twitter/user_spec.rb", "spec/twitter_spec.rb"]

  if s.respond_to? :specification_version then
    current_version = Gem::Specification::CURRENT_SPECIFICATION_VERSION
    s.specification_version = 3

    if Gem::Version.new(Gem::RubyGemsVersion) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<activesupport>, [">= 2.3.9", "< 4"])
      s.add_runtime_dependency(%q<faraday>, ["~> 0.7"])
      s.add_runtime_dependency(%q<multi_json>, ["~> 1.0"])
      s.add_runtime_dependency(%q<simple_oauth>, ["~> 0.1"])
      s.add_development_dependency(%q<json>, [">= 0"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<rdiscount>, [">= 0"])
      s.add_development_dependency(%q<rspec>, [">= 0"])
      s.add_development_dependency(%q<simplecov>, [">= 0"])
      s.add_development_dependency(%q<webmock>, [">= 0"])
      s.add_development_dependency(%q<yard>, [">= 0"])
    else
      s.add_dependency(%q<activesupport>, [">= 2.3.9", "< 4"])
      s.add_dependency(%q<faraday>, ["~> 0.7"])
      s.add_dependency(%q<multi_json>, ["~> 1.0"])
      s.add_dependency(%q<simple_oauth>, ["~> 0.1"])
      s.add_dependency(%q<json>, [">= 0"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<rdiscount>, [">= 0"])
      s.add_dependency(%q<rspec>, [">= 0"])
      s.add_dependency(%q<simplecov>, [">= 0"])
      s.add_dependency(%q<webmock>, [">= 0"])
      s.add_dependency(%q<yard>, [">= 0"])
    end
  else
    s.add_dependency(%q<activesupport>, [">= 2.3.9", "< 4"])
    s.add_dependency(%q<faraday>, ["~> 0.7"])
    s.add_dependency(%q<multi_json>, ["~> 1.0"])
    s.add_dependency(%q<simple_oauth>, ["~> 0.1"])
    s.add_dependency(%q<json>, [">= 0"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<rdiscount>, [">= 0"])
    s.add_dependency(%q<rspec>, [">= 0"])
    s.add_dependency(%q<simplecov>, [">= 0"])
    s.add_dependency(%q<webmock>, [">= 0"])
    s.add_dependency(%q<yard>, [">= 0"])
  end
end
