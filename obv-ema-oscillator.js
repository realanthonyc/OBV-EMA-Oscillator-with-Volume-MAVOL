// This Pine Script® code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Anthony C. https://x.com/anthonycxc

//@version=6
// -----------------------------------------------------------------------------
//  OBV-EMA Oscillator with Volume & MAVOL
//  - Volume columns + MAVOL (single pane)
//  - EMA and MAVOL lengths mapping:
//      1m–5m   → EMA=8,  MAVOL=8,  obvSmooth=2
//      >5m–15m → EMA=13, MAVOL=10
//      >15m–4h → EMA=21, MAVOL=20
//      >4h–1D  → EMA=34, MAVOL=30
//      >1D     → EMA=55, MAVOL=50
// -----------------------------------------------------------------------------
indicator("OBV-EMA Oscillator with Volume & MAVOL", shorttitle="OBV-EMA-VOL - v2.2.6 -", overlay=false)

// === Inputs ===
// Oscillator
groupOsc     = "Oscillator"
src          = input.source(close, "Price source", group=groupOsc)
showArea     = input.bool(true, "Fill oscillator area", group=groupOsc)
posColor     = input.color(color.new(color.green, 0), "Positive color", group=groupOsc, inline="col")
negColor     = input.color(color.new(color.red,   0), "Negative color", group=groupOsc, inline="col")
areaAlpha    = input.int(90, "Transparency (0–100)", minval=0, maxval=100, group=groupOsc)

// Volume
groupVol       = "Volume"
showVol        = input.bool(true, "Show volume", group=groupVol)
volAlpha       = input.int(25, "bar transparency", minval=0, maxval=100, group=groupVol, inline="vlen")
volColorMode   = input.string("By Candle", "Bar color mode", options=["By Candle", "By OBV momentum"],
                   tooltip="Color volume bars by candle direction or by OBV-EMA sign.", group=groupVol)

// === Timeframe mapping ===
tfSec   = timeframe.in_seconds(timeframe.period)
sec5m   = 5 * 60
sec15m  = 15 * 60
sec4h   = 4 * 60 * 60
sec1d   = 24 * 60 * 60
emaLen     = tfSec <= sec5m ? 8  : (tfSec <= sec15m ? 13 : (tfSec <= sec4h ? 21 : (tfSec <= sec1d ? 34 : 55)))
volLen     = tfSec <= sec5m ? 8  : (tfSec <= sec15m ? 10 : (tfSec <= sec4h ? 20 : (tfSec <= sec1d ? 30 : 50)))
obvSmooth  = tfSec <= sec5m ? 2  : 1   // slight smoothing on 1–5m

// === OBV-EMA Core ===
obvStep = ta.change(src) > 0 ? volume : ta.change(src) < 0 ? -volume : 0
obvRaw  = ta.cum(obvStep)
obvSm   = obvSmooth > 1 ? ta.ema(obvRaw, obvSmooth) : obvRaw
obvEma  = ta.ema(obvSm, emaLen)

// OBV-EMA Oscillator
osc     = obvSm - obvEma
oscCol  = osc >= 0 ? posColor : negColor
// NA protection: wait until both EMAs have enough bars
enOsc   = bar_index >= math.max(emaLen, obvSmooth)
oscPlot = enOsc ? osc : na

// === Volume + MAVOL ===
// NA protection: only compute MAVOL when there are enough bars
vma = bar_index >= volLen ? ta.sma(volume, volLen) : na

// Bar colors
vBarColByCandle = close >= open ? color.new(color.teal, volAlpha) : color.new(color.red, volAlpha)
vBarColByOBV    = enOsc and osc >= 0 ? color.new(color.teal, volAlpha) : color.new(color.red, volAlpha)
vBarCol         = volColorMode == "By Candle" ? vBarColByCandle : vBarColByOBV

// === Plotting ===
// OBV-EMA (line + area)
plot(oscPlot, "OBV-EMA Osc", color=oscCol, linewidth=1)
plot(showArea ? oscPlot : na, "Osc Area", color=color.new(oscCol, areaAlpha), style=plot.style_area)
hline(0, "Zero", color=color.gray)

// Volume + MAVOL
plot(showVol ? volume : na, title="Volume", style=plot.style_columns, color=vBarCol, linewidth=1)
plot(showVol ? vma    : na, title="MAVOL", color=color.rgb(200, 0, 236, 50), linewidth=1)