(function(pkg) {
  // Expose a require for our package so scripts can access our modules
  window.require = Require.generateFor(pkg);
})({
  "version": "0.5.0",
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "mode": "100644",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "core\n====\n\nAn object extension system.\n",
      "type": "blob"
    },
    "core.coffee.md": {
      "path": "core.coffee.md",
      "mode": "100644",
      "content": "###*\nThe Core class is used to add extended functionality to objects without\nextending the object class directly. Inherit from Core to gain its utility\nmethods.\n\n@name Core\n@constructor\n\n@param {Object} I Instance variables\n###\n\n    Core = (I={}) ->\n      self =\n\nExternal access to instance variables. Use of this property should be avoided\nin general, but can come in handy from time to time.\n\n>     #! example\n>     I =\n>       r: 255\n>       g: 0\n>       b: 100\n>\n>     myObject = Core(I)\n>\n>     [myObject.I.r, myObject.I.g, myObject.I.b]\n\n        I: I\n\nGenerates a public jQuery style getter / setter method for each `String` argument.\n\n>     #! example\n>     myObject = Core\n>       r: 255\n>       g: 0\n>       b: 100\n>\n>     myObject.attrAccessor \"r\", \"g\", \"b\"\n>\n>     myObject.r(254)\n\n        attrAccessor: (attrNames...) ->\n          attrNames.forEach (attrName) ->\n            self[attrName] = (newValue) ->\n              if arguments.length > 0\n                I[attrName] = newValue\n  \n                return self\n              else\n                I[attrName]\n\n          return self\n  \nGenerates a public jQuery style getter method for each String argument.\n\n>     #! example\n>     myObject = Core\n>       r: 255\n>       g: 0\n>       b: 100\n>\n>     myObject.attrReader \"r\", \"g\", \"b\"\n>\n>     [myObject.r(), myObject.g(), myObject.b()]\n\n        attrReader: (attrNames...) ->\n          attrNames.forEach (attrName) ->\n            self[attrName] = ->\n              I[attrName]\n\n          return self  \n\nExtends this object with methods from the passed in object. A shortcut for Object.extend(self, methods)\n  \n>     I =\n>       x: 30\n>       y: 40\n>       maxSpeed: 5\n>\n>     # we are using extend to give player\n>     # additional methods that Core doesn't have\n>     player = Core(I).extend\n>       increaseSpeed: ->\n>         I.maxSpeed += 1\n>\n>     player.increaseSpeed()\n\n        extend: (object) ->\n          extend self, object\n\nIncludes a module in this object. A module is a constructor that takes two parameters, `I` and `self`\n\n>     myObject = Core()\n>     myObject.include(Bindable)\n\n>     # now you can bind handlers to functions\n>     myObject.bind \"someEvent\", ->\n>       alert(\"wow. that was easy.\")\n\n        include: (modules...) ->\n          for Module in modules\n            Module(I, self)\n  \n          return self\n  \n      return self\n\nHelpers\n-------\n\nExtend an object with the properties of other objects.\n\n    extend = (target, sources...) ->\n      for source in sources\n        for name of source\n          target[name] = source[name]\n\n      return target\n\nExport\n\n    module.exports = Core\n",
      "type": "blob"
    },
    "test/core.coffee": {
      "path": "test/core.coffee",
      "mode": "100644",
      "content": "Core = require \"../core\"\n\nok = assert\nequals = assert.equal\ntest = it\n\ndescribe \"Core\", ->\n\n  test \"#extend\", ->\n    o = Core()\n  \n    o.extend\n      test: \"jawsome\"\n  \n    equals o.test, \"jawsome\"\n  \n  test \"#attrAccessor\", ->\n    o = Core\n      test: \"my_val\"\n  \n    o.attrAccessor(\"test\")\n  \n    equals o.test(), \"my_val\"\n    equals o.test(\"new_val\"), o\n    equals o.test(), \"new_val\"\n  \n  test \"#attrReader\", ->\n    o = Core\n      test: \"my_val\"\n  \n    o.attrReader(\"test\")\n  \n    equals o.test(), \"my_val\"\n    equals o.test(\"new_val\"), \"my_val\"\n    equals o.test(), \"my_val\"\n  \n  test \"#include\", ->\n    o = Core\n      test: \"my_val\"\n  \n    M = (I, self) ->\n      self.attrReader \"test\"\n  \n      self.extend\n        test2: \"cool\"\n  \n    ret = o.include M\n  \n    equals ret, o, \"Should return self\"\n  \n    equals o.test(), \"my_val\"\n    equals o.test2, \"cool\"\n  \n  test \"#include multiple\", ->\n    o = Core\n      test: \"my_val\"\n  \n    M = (I, self) ->\n      self.attrReader \"test\"\n  \n      self.extend\n        test2: \"cool\"\n  \n    M2 = (I, self) ->\n      self.extend\n        test2: \"coolio\"\n  \n    o.include M, M2\n  \n    equals o.test2, \"coolio\"\n",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "version: \"0.5.0\"\nremoteDependencies: [\n  \"http://strd6.github.io/require/v0.2.2.js\"\n]\n",
      "type": "blob"
    }
  },
  "distribution": {
    "core": {
      "path": "core",
      "content": "(function() {\n  var Core, extend,\n    __slice = [].slice;\n\n  Core = function(I) {\n    var self;\n    if (I == null) {\n      I = {};\n    }\n    self = {\n      I: I,\n      attrAccessor: function() {\n        var attrNames;\n        attrNames = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        attrNames.forEach(function(attrName) {\n          return self[attrName] = function(newValue) {\n            if (arguments.length > 0) {\n              I[attrName] = newValue;\n              return self;\n            } else {\n              return I[attrName];\n            }\n          };\n        });\n        return self;\n      },\n      attrReader: function() {\n        var attrNames;\n        attrNames = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        attrNames.forEach(function(attrName) {\n          return self[attrName] = function() {\n            return I[attrName];\n          };\n        });\n        return self;\n      },\n      extend: function(object) {\n        return extend(self, object);\n      },\n      include: function() {\n        var Module, modules, _i, _len;\n        modules = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        for (_i = 0, _len = modules.length; _i < _len; _i++) {\n          Module = modules[_i];\n          Module(I, self);\n        }\n        return self;\n      }\n    };\n    return self;\n  };\n\n  extend = function() {\n    var name, source, sources, target, _i, _len;\n    target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n    for (_i = 0, _len = sources.length; _i < _len; _i++) {\n      source = sources[_i];\n      for (name in source) {\n        target[name] = source[name];\n      }\n    }\n    return target;\n  };\n\n  module.exports = Core;\n\n}).call(this);\n\n//# sourceURL=core.coffee",
      "type": "blob"
    },
    "test/core": {
      "path": "test/core",
      "content": "(function() {\n  var Core, equals, ok, test;\n\n  Core = require(\"../core\");\n\n  ok = assert;\n\n  equals = assert.equal;\n\n  test = it;\n\n  describe(\"Core\", function() {\n    test(\"#extend\", function() {\n      var o;\n      o = Core();\n      o.extend({\n        test: \"jawsome\"\n      });\n      return equals(o.test, \"jawsome\");\n    });\n    test(\"#attrAccessor\", function() {\n      var o;\n      o = Core({\n        test: \"my_val\"\n      });\n      o.attrAccessor(\"test\");\n      equals(o.test(), \"my_val\");\n      equals(o.test(\"new_val\"), o);\n      return equals(o.test(), \"new_val\");\n    });\n    test(\"#attrReader\", function() {\n      var o;\n      o = Core({\n        test: \"my_val\"\n      });\n      o.attrReader(\"test\");\n      equals(o.test(), \"my_val\");\n      equals(o.test(\"new_val\"), \"my_val\");\n      return equals(o.test(), \"my_val\");\n    });\n    test(\"#include\", function() {\n      var M, o, ret;\n      o = Core({\n        test: \"my_val\"\n      });\n      M = function(I, self) {\n        self.attrReader(\"test\");\n        return self.extend({\n          test2: \"cool\"\n        });\n      };\n      ret = o.include(M);\n      equals(ret, o, \"Should return self\");\n      equals(o.test(), \"my_val\");\n      return equals(o.test2, \"cool\");\n    });\n    return test(\"#include multiple\", function() {\n      var M, M2, o;\n      o = Core({\n        test: \"my_val\"\n      });\n      M = function(I, self) {\n        self.attrReader(\"test\");\n        return self.extend({\n          test2: \"cool\"\n        });\n      };\n      M2 = function(I, self) {\n        return self.extend({\n          test2: \"coolio\"\n        });\n      };\n      o.include(M, M2);\n      return equals(o.test2, \"coolio\");\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/core.coffee",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.5.0\",\"remoteDependencies\":[\"http://strd6.github.io/require/v0.2.2.js\"]};",
      "type": "blob"
    }
  },
  "entryPoint": "main",
  "dependencies": {},
  "remoteDependencies": [
    "http://strd6.github.io/require/v0.2.2.js"
  ],
  "repository": {
    "id": 13567517,
    "name": "core",
    "full_name": "STRd6/core",
    "owner": {
      "login": "STRd6",
      "id": 18894,
      "avatar_url": "https://1.gravatar.com/avatar/33117162fff8a9cf50544a604f60c045?d=https%3A%2F%2Fidenticons.github.com%2F39df222bffe39629d904e4883eabc654.png",
      "gravatar_id": "33117162fff8a9cf50544a604f60c045",
      "url": "https://api.github.com/users/STRd6",
      "html_url": "https://github.com/STRd6",
      "followers_url": "https://api.github.com/users/STRd6/followers",
      "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
      "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
      "organizations_url": "https://api.github.com/users/STRd6/orgs",
      "repos_url": "https://api.github.com/users/STRd6/repos",
      "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
      "received_events_url": "https://api.github.com/users/STRd6/received_events",
      "type": "User",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/STRd6/core",
    "description": "An object extension system.",
    "fork": false,
    "url": "https://api.github.com/repos/STRd6/core",
    "forks_url": "https://api.github.com/repos/STRd6/core/forks",
    "keys_url": "https://api.github.com/repos/STRd6/core/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/STRd6/core/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/STRd6/core/teams",
    "hooks_url": "https://api.github.com/repos/STRd6/core/hooks",
    "issue_events_url": "https://api.github.com/repos/STRd6/core/issues/events{/number}",
    "events_url": "https://api.github.com/repos/STRd6/core/events",
    "assignees_url": "https://api.github.com/repos/STRd6/core/assignees{/user}",
    "branches_url": "https://api.github.com/repos/STRd6/core/branches{/branch}",
    "tags_url": "https://api.github.com/repos/STRd6/core/tags",
    "blobs_url": "https://api.github.com/repos/STRd6/core/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/STRd6/core/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/STRd6/core/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/STRd6/core/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/STRd6/core/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/STRd6/core/languages",
    "stargazers_url": "https://api.github.com/repos/STRd6/core/stargazers",
    "contributors_url": "https://api.github.com/repos/STRd6/core/contributors",
    "subscribers_url": "https://api.github.com/repos/STRd6/core/subscribers",
    "subscription_url": "https://api.github.com/repos/STRd6/core/subscription",
    "commits_url": "https://api.github.com/repos/STRd6/core/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/STRd6/core/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/STRd6/core/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/STRd6/core/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/STRd6/core/contents/{+path}",
    "compare_url": "https://api.github.com/repos/STRd6/core/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/STRd6/core/merges",
    "archive_url": "https://api.github.com/repos/STRd6/core/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/STRd6/core/downloads",
    "issues_url": "https://api.github.com/repos/STRd6/core/issues{/number}",
    "pulls_url": "https://api.github.com/repos/STRd6/core/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/STRd6/core/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/STRd6/core/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/STRd6/core/labels{/name}",
    "created_at": "2013-10-14T17:04:33Z",
    "updated_at": "2013-10-14T17:04:33Z",
    "pushed_at": "2013-10-14T17:04:33Z",
    "git_url": "git://github.com/STRd6/core.git",
    "ssh_url": "git@github.com:STRd6/core.git",
    "clone_url": "https://github.com/STRd6/core.git",
    "svn_url": "https://github.com/STRd6/core",
    "homepage": null,
    "size": 0,
    "watchers_count": 0,
    "language": null,
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "master_branch": "master",
    "default_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "network_count": 0,
    "branch": "master",
    "defaultBranch": "master",
    "includedModules": [
      "Bindable"
    ]
  },
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  }
});