# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{elo}
  s.version = "0.1.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Iain Hecker"]
  s.date = %q{2010-03-17}
  s.description = %q{The Elo rating system is a method for calculating the relative skill levels of players in two-player games such as cess and Go.}
  s.email = %q{iain@iain.nl}
  s.extra_rdoc_files = ["README.rdoc"]
  s.files = [".document", ".gitignore", "README.rdoc", "Rakefile", "VERSION", "doc/classes/Elo.html", "doc/classes/Elo/Configuration.html", "doc/classes/Elo/EloHelper.html", "doc/classes/Elo/EloHelper/ClassMethods.html", "doc/classes/Elo/Game.html", "doc/classes/Elo/Player.html", "doc/classes/Elo/Rating.html", "doc/created.rid", "doc/files/README_rdoc.html", "doc/files/lib/elo_rb.html", "doc/fr_class_index.html", "doc/fr_file_index.html", "doc/fr_method_index.html", "doc/index.html", "doc/rdoc-style.css", "elo.gemspec", "lib/elo.rb", "lib/elo/configuration.rb", "lib/elo/game.rb", "lib/elo/helper.rb", "lib/elo/player.rb", "lib/elo/rating.rb", "spec/elo_spec.rb", "spec/spec.opts", "spec/spec_helper.rb"]
  s.homepage = %q{http://github.com/iain/elo}
  s.rdoc_options = ["--charset=UTF-8"]
  s.require_paths = ["lib"]
  s.rubygems_version = %q{1.3.6}
  s.summary = %q{The Elo rating system is a method for calculating the relative skill levels of players in two-player games such as cess and Go.}
  s.test_files = ["spec/elo_spec.rb", "spec/spec_helper.rb"]

  if s.respond_to? :specification_version then
    current_version = Gem::Specification::CURRENT_SPECIFICATION_VERSION
    s.specification_version = 3

    if Gem::Version.new(Gem::RubyGemsVersion) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<rspec>, [">= 1.2.9"])
    else
      s.add_dependency(%q<rspec>, [">= 1.2.9"])
    end
  else
    s.add_dependency(%q<rspec>, [">= 1.2.9"])
  end
end
