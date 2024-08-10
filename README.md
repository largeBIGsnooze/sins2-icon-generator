# sins2-icon-gen

## Usage

- Download the latest [release](https://github.com/largeBIGsnooze/sins2-icon-generator/releases) executable

- Drag & Drop your icons inside of the `sins2-icon-gen.exe`
---

Edit the `icon_dimensions.json` if you wish to modify the dimensions of your icons

```json
{
  "icon": [170, 80], // width, height
  "hud_icon": [170, 80],
  "tooltip_picture": [918, 432]
}
```

You can alternatively write a .bat script to iterate over all the icons without the need to drag them over to the executable, like so
```bat
@echo off

for %%i in (*hud_icon200.png, *icon200.png, *tooltip_picture200.png) do (
	echo processing: %%i
	sins2-icon-gen.exe -s %%i
)
```