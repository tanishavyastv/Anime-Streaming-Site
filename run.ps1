param(
    [int]$Port = 8000
)

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

$pythonCommand = $null

if (Get-Command py -ErrorAction SilentlyContinue) {
    $pythonCommand = { py -m http.server $Port }
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonCommand = { python -m http.server $Port }
}

if (-not $pythonCommand) {
    Write-Error "Python was not found. Install Python or run the site with VS Code Live Server."
    exit 1
}

Write-Host ""
Write-Host "H!Anime local server starting..." -ForegroundColor Cyan
Write-Host "Open: http://localhost:$Port/index.html" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop." -ForegroundColor DarkGray
Write-Host ""

& $pythonCommand
