$ErrorActionPreference = 'SilentlyContinue'
$log = Join-Path $PWD 'vite-dev.log'
$err = Join-Path $PWD 'vite-dev.err'
if (Test-Path $log) { Remove-Item $log -Force }
if (Test-Path $err) { Remove-Item $err -Force }
$vite = Join-Path $PWD 'node_modules\.bin\vite.cmd'
if (-not (Test-Path $vite)) { Write-Error 'vite binary not found. Please run npm install first.'; exit 1 }
$p = Start-Process -FilePath $vite -ArgumentList @() -PassThru -NoNewWindow -RedirectStandardOutput $log -RedirectStandardError $err
$deadline = (Get-Date).AddSeconds(25)
$foundUrl = $null
while ((Get-Date) -lt $deadline) {
  if (Test-Path $log) {
    try {
      $content = Get-Content -Path $log -Raw
    } catch {}
    if ($content) {
      $m = [regex]::Match($content, 'Local:\s+(http://[\w\.\:\-]+/?)', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
      if ($m.Success) { $foundUrl = $m.Groups[1].Value; break }
    }
  }
  Start-Sleep -Milliseconds 300
}
if ($foundUrl) {
  Write-Output "URL: $foundUrl"
  Write-Output "PID: $($p.Id)"
} else {
  Write-Output "Dev server starting (PID: $($p.Id)). Logs: $log, $err"
  if (Test-Path $log) { Write-Output '---- vite-dev.log (tail) ----'; Get-Content $log -Tail 100 }
  if (Test-Path $err) { Write-Output '---- vite-dev.err (tail) ----'; Get-Content $err -Tail 100 }
}
