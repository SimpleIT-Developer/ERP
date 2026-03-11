param(
  [string]$RemoteUrl = "https://github.com/SimpleIT-Developer/ERP.git",
  [string]$RemoteName = "origin",
  [string]$Branch = "main",
  [Parameter(Position = 0)]
  [string]$Message,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

function GitCmd {
  param([string[]]$GitArgs)
  Write-Output ("git " + ($GitArgs -join " "))
  if (-not $DryRun) {
    & git @GitArgs
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
  }
}

function GitOutAllowFail {
  param([string[]]$GitArgs)
  $out = & git @GitArgs 2>$null
  if ($LASTEXITCODE -ne 0) { return "" }
  return ($out | Out-String).Trim()
}

if (-not (Test-Path -Path ".git")) {
  GitCmd -GitArgs @("init", "-b", $Branch)
}

$remoteExists = GitOutAllowFail -GitArgs @("remote", "get-url", $RemoteName)
if ([string]::IsNullOrWhiteSpace($remoteExists)) {
  GitCmd -GitArgs @("remote", "add", $RemoteName, $RemoteUrl)
} else {
  $currentUrl = GitOutAllowFail -GitArgs @("remote", "get-url", $RemoteName)
  if ($currentUrl -ne $RemoteUrl) {
    GitCmd -GitArgs @("remote", "set-url", $RemoteName, $RemoteUrl)
  }
}

$currentBranch = GitOutAllowFail -GitArgs @("branch", "--show-current")
if ([string]::IsNullOrWhiteSpace($currentBranch)) {
  GitCmd -GitArgs @("checkout", "-b", $Branch)
} elseif ($currentBranch -ne $Branch) {
  GitCmd -GitArgs @("checkout", $Branch)
}

GitCmd -GitArgs @("fetch", $RemoteName, "--prune")

$remoteBranchExists = GitOutAllowFail -GitArgs @("ls-remote", "--heads", $RemoteName, $Branch)
if (-not [string]::IsNullOrWhiteSpace($remoteBranchExists)) {
  GitCmd -GitArgs @("pull", "--rebase", "--autostash", $RemoteName, $Branch)
}

$porcelain = GitOutAllowFail -GitArgs @("status", "--porcelain")
if (-not [string]::IsNullOrWhiteSpace($porcelain)) {
  if ([string]::IsNullOrWhiteSpace($Message)) {
    if ($DryRun) {
      Write-Output "Existem mudancas locais. Use: .\\sync.ps1 -Message sua_mensagem"
      GitCmd -GitArgs @("status", "-sb")
      exit 2
    }

    Write-Output "Existem mudancas locais. Informe a mensagem do commit:"
    $Message = Read-Host "Message"
    if ([string]::IsNullOrWhiteSpace($Message)) {
      Write-Output "Mensagem vazia. Cancelando."
      GitCmd -GitArgs @("status", "-sb")
      exit 2
    }
  }
  GitCmd -GitArgs @("add", "-A")
  GitCmd -GitArgs @("commit", "-m", $Message)
}

GitCmd -GitArgs @("push", "-u", $RemoteName, $Branch)
