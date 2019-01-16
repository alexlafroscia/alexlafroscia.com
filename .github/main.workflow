workflow "Deploy from Master" {
  on = "push"
  resolves = ["Alias Deployment"]
}

action "Filter on Master Branch" {
  uses = "actions/bin/filter@b2bea0749eed6beb495a8fa194c071847af60ea1"
  args = "branch master"
}

action "Deploy to Now" {
  uses = "actions/zeit-now@9fe84d557939d277e0d98318b625bd48d364a89b"
  secrets = ["ZEIT_TOKEN"]
  needs = ["Filter on Master Branch"]
}

action "Alias Deployment" {
  uses = "actions/zeit-now@9fe84d557939d277e0d98318b625bd48d364a89b"
  needs = ["Deploy to Now"]
  secrets = ["ZEIT_TOKEN"]
  args = "alias"
}
