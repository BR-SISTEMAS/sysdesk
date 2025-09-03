param(
  [string]$Repo = "BR-SISTEMAS/sysdesk",
  [string]$JsonPath = "docs/issues_backlog_sprints.json"
)

# Pré-requisitos: GitHub CLI (gh) instalado e autenticado (gh auth status)

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
  Write-Error "GitHub CLI (gh) não encontrado. Instale em https://cli.github.com/"; exit 1
}

$auth = gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Error "Não autenticado no GitHub. Execute: gh auth login"; exit 1
}

if (-not (Test-Path $JsonPath)) {
  Write-Error "Arquivo não encontrado: $JsonPath"; exit 1
}

$issues = Get-Content -Raw $JsonPath | ConvertFrom-Json

foreach ($i in $issues) {
  Write-Host "Criando issue: $($i.title)" -ForegroundColor Cyan
  gh issue create --repo $Repo --title $i.title --body $i.body | Out-Host
}

Write-Host "Concluído." -ForegroundColor Green

