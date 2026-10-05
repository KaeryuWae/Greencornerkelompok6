# Script pembantu: Optimasi dan Konversi Foto Asli GreenCorner
# Membaca foto asli (66146.jpg s/d 66152.jpg) lalu mengecilkan sisi terpanjang ke ~1100 px,
# kualitas JPEG 72, dan menyimpan ke assets/img/ dengan nama baru yang sesuai.

Add-Type -AssemblyName System.Drawing

$photoMap = @{
    "66150.jpg" = @{ Target = "assets/img/diskusi.jpg"; MaxSide = 1100 }
    "66149.jpg" = @{ Target = "assets/img/ukur-lahan.jpg"; MaxSide = 1100 }
    "66148.jpg" = @{ Target = "assets/img/hasil-dekat.jpg"; MaxSide = 1100 }
    "66146.jpg" = @{ Target = "assets/img/asoka.jpg"; MaxSide = 1100 }
    "66151.jpg" = @{ Target = "assets/img/detail-tanaman.jpg"; MaxSide = 1100 }
    "66147.jpg" = @{ Target = "assets/img/hasil-lebar.jpg"; MaxSide = 1100 }
    "66152.jpg" = @{ Target = "assets/img/hasil-jauh.jpg"; MaxSide = 1100 }
}

$searchDirs = @(".", "assets/img", "assets/img/raw", "$env:USERPROFILE/Downloads", "$env:USERPROFILE/Desktop")

Write-Host "Mencari foto asli (66146.jpg - 66152.jpg)..." -ForegroundColor Cyan

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = [System.Drawing.Imaging.EncoderParameters]::new(1)
$encoderParams.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]72)

$foundCount = 0

foreach ($srcName in $photoMap.Keys) {
    $item = $photoMap[$srcName]
    $foundPath = $null
    
    foreach ($dir in $searchDirs) {
        $candidate = Join-Path $dir $srcName
        if (Test-Path $candidate) {
            $foundPath = $candidate
            break
        }
    }
    
    if ($foundPath) {
        $foundCount++
        Write-Host "Memproses $srcName dari $foundPath -> $($item.Target)" -ForegroundColor Green
        
        $srcImg = [System.Drawing.Image]::FromFile($foundPath)
        
        # Perbaiki orientasi EXIF jika ada
        if ($srcImg.PropertyIdList -contains 0x0112) {
            $prop = $srcImg.GetPropertyItem(0x0112)
            $orient = [BitConverter]::ToUInt16($prop.Value, 0)
            if ($orient -eq 6) { $srcImg.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
            elseif ($orient -eq 8) { $srcImg.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
            elseif ($orient -eq 3) { $srcImg.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
        }
        
        # Hitung skala baru (sisi terpanjang ~1100 px)
        $w = $srcImg.Width
        $h = $srcImg.Height
        if ($w -ge $h) {
            $newW = [Math]::Min($item.MaxSide, $w)
            $newH = [int](($newW / $w) * $h)
        } else {
            $newH = [Math]::Min($item.MaxSide, $h)
            $newW = [int](($newH / $h) * $w)
        }
        
        $destBmp = [System.Drawing.Bitmap]::new($newW, $newH)
        $gfx = [System.Drawing.Graphics]::FromImage($destBmp)
        $gfx.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $gfx.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
        $gfx.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        
        $destBmp.SetResolution(72, 72)
        $gfx.DrawImage($srcImg, 0, 0, $newW, $newH)
        
        $destBmp.Save($item.Target, $codec, $encoderParams)
        
        $gfx.Dispose()
        $destBmp.Dispose()
        $srcImg.Dispose()
    }
}

if ($foundCount -eq 0) {
    Write-Host "Foto asli (66146.jpg - 66152.jpg) belum ditemukan di folder. Foto placeholder tanaman tetap aktif dan siap pakai!" -ForegroundColor Yellow
} else {
    Write-Host "Berhasil memproses $foundCount foto." -ForegroundColor Green
}
