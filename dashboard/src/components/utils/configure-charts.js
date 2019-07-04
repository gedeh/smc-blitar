import { defaults } from "react-chartjs-2"

defaults.global.legend.display = false
defaults.global.title.display = false
defaults.global.tooltips.enabled = false

// scales grid lines
defaults.scale.gridLines.display = true
defaults.scale.gridLines.color = "rgba(0,0,0,0.10)"
defaults.scale.gridLines.drawTicks = true
defaults.scale.gridLines.borderWidth = "1"

// scales labels
defaults.scale.ticks.display = false
defaults.scale.ticks.fontColor = "rgba(0,0,0,0.70)"

defaults.global.elements.line.borderWidth = "1"
defaults.global.elements.line.borderColor = "rgba(0,0,0,0.30)"
defaults.global.elements.line.backgroundColor = "rgba(0,0,0,0.35)"

defaults.global.elements.rectangle.borderWidth = "1"
defaults.global.elements.rectangle.borderColor = "rgba(0,0,0,0.30)"
defaults.global.elements.rectangle.backgroundColor = "rgba(0,0,0,0.35)"
