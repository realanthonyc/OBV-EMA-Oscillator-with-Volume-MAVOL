# OBV-EMA Oscillator with Volume & MAVOL for TradingView

**Author:** Anthony C. https://x.com/anthonycxc  

Pine Script® v6  

---

## Overview
This TradingView indicator plots the **OBV-EMA Oscillator** together with **Volume bars** and a **MAVOL line** in a single pane.  
It highlights whether **On-Balance Volume (OBV)** is currently above or below its **EMA trend line**, providing a clean oscillator view of buying/selling pressure.

---

## Features
- OBV − EMA(OBV) oscillator (green above 0, red below 0)  
- Automatic **EMA / MAVOL length mapping** by timeframe:
  - `1m–5m`   → EMA=8,  MAVOL=8,  obvSmooth=2  
  - `>5m–15m` → EMA=13, MAVOL=10  
  - `>15m–4h` → EMA=21, MAVOL=20  
  - `>4h–1D`  → EMA=34, MAVOL=30  
  - `>1D`     → EMA=55, MAVOL=50  
- Adjustable **area fill transparency**  
- Volume columns with **dynamic bar color** (by candle or by OBV momentum)  
- NA protection for oscillator and MAVOL (avoids noisy early bars)  

---

## Usage
- **Above Zero** → OBV stronger than its EMA trend, bullish volume support.  
- **Below Zero** → OBV weaker than its EMA trend, bearish volume pressure.  
- **Crossing Zero** → potential early signal of momentum shift.  
- **Reading divergence (quick guide):**
  - **Bearish divergence:** price makes a higher high while the oscillator makes a **lower high** (especially if it cannot stay above 0). Risk of fake breakout; look for volume not exceeding **MAVOL** as confirmation.
  - **Bullish divergence:** price makes a lower low while the oscillator makes a **higher low** (ideally reclaiming 0 soon after). Watch for volume **rising above MAVOL** to validate.
- Use **MAVOL** to check whether current volume is above/below its average baseline  
- Always combine with price action/S-R, VWAP or trend filters for entries and risk control.

---

## Installation
1. Open **TradingView → Pine Editor**  
2. Paste the script and save  
3. Click **Add to chart**  

---

## Notes
- OBV is cumulative and can be noisy on very low timeframes → smoothing (EMA) makes trends clearer  
- Colors and transparency are configurable in the settings panel  

---

## Changelog
- Please refer to release notes

---