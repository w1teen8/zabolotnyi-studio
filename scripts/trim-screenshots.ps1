# Trims trailing blank space some sites leave at the bottom of the page.
# Run after scripts/capture-screenshots.mjs.
# Usage: powershell -ExecutionPolicy Bypass -File scripts/trim-screenshots.ps1
Add-Type -AssemblyName System.Drawing

$dir = "src\assets\projects"
$files = Get-ChildItem "$dir\*.jpg"

foreach ($f in $files) {
  $img = [System.Drawing.Bitmap]::FromFile($f.FullName)
  $w = $img.Width
  $h = $img.Height
  $samples = 40
  $step = [Math]::Max(1, [Math]::Floor($w / $samples))

  $scanLimit = [Math]::Min($h - 1, 4000)
  $cutY = $h - 1
  $found = $false

  for ($y = $h - 1; $y -ge ($h - $scanLimit); $y--) {
    $minSum = 999999
    $maxSum = -1
    for ($x = 0; $x -lt $w; $x += $step) {
      $p = $img.GetPixel($x, $y)
      $sum = $p.R + $p.G + $p.B
      if ($sum -lt $minSum) { $minSum = $sum }
      if ($sum -gt $maxSum) { $maxSum = $sum }
    }
    $range = $maxSum - $minSum
    if ($range -gt 10) {
      $cutY = $y
      $found = $true
      break
    }
  }

  $trimmed = $h - $cutY
  if ($found -and $trimmed -gt 80) {
    $newH = [Math]::Min($h, $cutY + 32)
    $rect = New-Object System.Drawing.Rectangle 0, 0, $w, $newH
    $bmp = New-Object System.Drawing.Bitmap $w, $newH
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $w, $newH), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $img.Dispose()
    $g.Dispose()

    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $params = New-Object System.Drawing.Imaging.EncoderParameters 1
    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [int64]82)
    $bmp.Save($f.FullName, $encoder, $params)
    $bmp.Dispose()
    "{0,-30} trimmed {1}px -> {2}px" -f $f.Name, $trimmed, $newH
  } else {
    $img.Dispose()
    "{0,-30} no trim needed ({1}px tail)" -f $f.Name, $trimmed
  }
}
