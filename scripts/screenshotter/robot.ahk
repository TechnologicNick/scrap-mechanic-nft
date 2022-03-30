; #SingleInstance force
WinActivate("Scrap Mechanic ahk_class CONTRAPTION_WINDOWS_CLASS")

sleepDuration := 30

paletteCount := [5, 17, 0, 0, 0, 0, 0, 0, 0]
garmentCount := [11, 14, 15, 12, 38, 14, 14, 14, 11]

currentConfig := [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
currentCategory := [0]

Timout() {
    Sleep sleepDuration
}

Join(sep, params) {
    for index, param in params
        str .= sep . param
    return SubStr(str, StrLen(sep)+1)
}

ClickGender(i) {
    MouseClick("left", 83 + 57 * i, 154)
    currentConfig[1] := i
    ; MsgBox(Join(",", currentConfig), "ClickGender " . currentCategory[1])
    Timout()
}

ClickCategory(i) {
    MouseClick("left", 56, 236 + 61 * i)
    currentCategory[1] := i
    ; MsgBox(Join(",", currentConfig), "ClickCategory " . currentCategory[1])
    Timout()
}

ClickPalette(i) {
    x := 270 + 50 * Mod(i, 10)
    y := 198 + 50 * Floor(i / 10)
    MouseClick("left", x, y)
    currentConfig[currentCategory[1] + 2] := i
    ; MsgBox(Join(",", currentConfig), "ClickPalette " . currentCategory[1])
    Timout()
}

ClickGarment(i) {
    x := 280 + 110 * Mod(i, 6)
    y := 333 + 110 * Floor(i / 6)
    MouseClick("left", x, y)
    currentConfig[currentCategory[1] + 4] := i
    ; MsgBox(Join(",", currentConfig), "ClickGarment " . currentCategory[1])
    Timout()
}

PreloadModels() {
    Loop 2 {
        ClickGender(A_Index - 1)

        Loop 9 {
            ClickCategory(A_Index - 1)

            Loop paletteCount[A_Index] {
                ClickPalette(A_Index - 1)
            }

            Loop garmentCount[A_Index] {
                ClickGarment(A_Index - 1)
            }
        }
    }
}

RandomCharacter() {
    ClickGender(Random(0, 1))

    Loop 9 {
        ClickCategory(A_Index - 1)
        
        if (paletteCount[A_Index] > 0) {
            ClickPalette(Random(0, paletteCount[A_Index] - 1))
        }
        
        ClickGarment(Random(0, garmentCount[A_Index] - 1))
    }
}

Screenshot() {
    ; start := A_TickCount
    WinGetPos(&x, &y, &w, &h, "Scrap Mechanic ahk_class CONTRAPTION_WINDOWS_CLASS")
    x := x + 965
    y := y + 35
    w := 960
    h := 1070

    filename := "D:/Files/scrap-mechanic-nft/jpeg/" . Join(",", currentConfig) . ".jpg"

    cmd := "Add-type -AssemblyName System.Drawing; "
    cmd := cmd . "$bitmap = New-Object System.Drawing.Bitmap " . w . ", " . h . "; "
    cmd := cmd . "$graphic = [System.Drawing.Graphics]::FromImage($bitmap); "
    cmd := cmd . "$graphic.CopyFromScreen(" . x . ", " . y . ", 0, 0, $bitmap.Size); "
    cmd := cmd . "$bitmap.Save('" . filename . "', [System.Drawing.Imaging.ImageFormat]::Jpeg);"
    RunWait("PowerShell.exe -Command " . cmd, , "Hide")
    ; MsgBox A_TickCount - start
}

; Screenshot()
; ExitApp

If (StrCompare(A_Args[1], "preload") == 0) {
    PreloadModels()
} Else If (StrCompare(A_Args[1], "random") == 0) {
    While true {
        RandomCharacter()
        Screenshot()
    }
} Else {
    ; Gender
    ClickGender(A_Args[1])
    
    ; Face
    ClickCategory(0)
    ClickPalette(A_Args[2])
    ClickGarment(A_Args[3])

    ; Hair
    ClickCategory(1)
    ClickPalette(A_Args[4])
    ClickGarment(A_Args[5])

    ; Facial Hair
    ClickCategory(2)
    ClickGarment(A_Args[6])

    ; Hat
    ClickCategory(3)
    ClickGarment(A_Args[7])
    
    ; Torso
    ClickCategory(4)
    ClickGarment(A_Args[8])
    
    ; Gloves
    ClickCategory(5)
    ClickGarment(A_Args[9])
    
    ; Legs
    ClickCategory(6)
    ClickGarment(A_Args[10])
    
    ; Shoes
    ClickCategory(7)
    ClickGarment(A_Args[11])
    
    ; Backpack
    ClickCategory(8)
    ClickGarment(A_Args[12])
}



ExitApp
Esc::ExitApp
