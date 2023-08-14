package graph

import (
	"fmt"
	"math"
	"image"
	"image/color"
	"image/png"
	"os"
)

const (
	MapWidth  = 30.0
	MapHeight = 30.0
	MaxIntensity = 255.0
	MinIntensity = 150.0
	screenWidth = 1500.0
	screenHeight = 2000.0
)

type CursorPosition struct {
	ClientX      int `json:"clientX"`
	ClientY      int `json:"clientY"`
	Hours        int `json:"hours"`
	Milliseconds int `json:"milliseconds"`
	Minutes      int `json:"minutes"`
	Seconds      int `json:"seconds"`
}

type VelocityVector struct {
	Speed, Direction float64
}

type Node struct {
	Properties CursorPosition
	Velocity   VelocityVector
	Neighbours []*Node
}

type GraphStatistics struct {
	TotalNodes           int
	AverageVelocity      float64
	MaxVelocityNodeIndex int
	MinVelocityNodeIndex int
	MaxVelocity          float64
	MinVelocity          float64
	AverageNeighbors     float64
	MaxNeighborsNodeIndex int
	MinNeighborsNodeIndex int
	StandardDeviation     float64
	AverageAutoCorrelation 	  float64
}

func calculateVector(p1, p2 CursorPosition) VelocityVector {
	timeDifference := float64((p2.Hours-p1.Hours)*3600000 + (p2.Minutes-p1.Minutes)*60000 + (p2.Seconds-p1.Seconds)*1000 + (p2.Milliseconds - p1.Milliseconds))
	xDistance := float64(p2.ClientX - p1.ClientX)
	yDistance := float64(p2.ClientY - p1.ClientY)

	speed := math.Sqrt(math.Pow(xDistance, 2)+math.Pow(yDistance, 2)) / timeDifference
	direction := math.Atan2(yDistance, xDistance)

	return VelocityVector{speed, direction}
}

func MakeGraph(points []CursorPosition) []*Node {

	nodes := []*Node{}
	uniqueProperties := map[string]bool{}

	for _, p := range points {
		propertyKey := fmt.Sprintf("%d:%d", p.ClientX, p.ClientY)

		if uniqueProperties[propertyKey] {
			continue
		}
		nodes = append(nodes, &Node{
			Properties: p,
			Velocity:   VelocityVector{},
		})
		uniqueProperties[propertyKey] = true
	}

	for i := 1; i < len(nodes); i++ {
		nodes[i].Velocity = calculateVector(nodes[i-1].Properties, nodes[i].Properties)
	}

	for i := 0; i < len(nodes); i++ {
		for j := i + 1; j < len(nodes); j++ {
			dx := float64(nodes[i].Properties.ClientX - nodes[j].Properties.ClientX)
			dy := float64(nodes[i].Properties.ClientY - nodes[j].Properties.ClientY)
			distance := math.Sqrt(dx*dx + dy*dy)

			if distance <= 50 {
				nodes[i].Neighbours = append(nodes[i].Neighbours, nodes[j])
				nodes[j].Neighbours = append(nodes[j].Neighbours, nodes[i])
			}
		}
	}
	return nodes
}

func CreateDensityHeatMap(nodes []*Node) {
	grid := make([][]int, MapHeight+1)
	for i := range grid {
		grid[i] = make([]int, MapWidth+1)
	}

	maxGridX := 0
	maxGridY := 0

	for _, node := range nodes {
		if node.Properties.ClientX > maxGridX {
			maxGridX = node.Properties.ClientX
		}
		if node.Properties.ClientY > maxGridY {
			maxGridY = node.Properties.ClientY
		}
	}

	for _, node := range nodes {
		gridX := int((float64(node.Properties.ClientX) / float64(maxGridX)) * MapWidth)
		gridY := int((float64(node.Properties.ClientY) / float64(maxGridY)) * MapHeight)
		grid[gridX][gridY]++
	}

	heatMap := image.NewRGBA(image.Rect(0, 0, MapWidth, MapHeight))

	densityUpperBound := 0

	for y := 0; y < MapWidth; y++ {
		for x := 0; x < MapHeight; x++ {
			if grid[y][x] > densityUpperBound {
				densityUpperBound = grid[y][x]
			}
		}
	}

	startColor := color.RGBA{0, 0, 255, 255} 
	midColor := color.RGBA{0, 255, 0, 255}   
	endColor := color.RGBA{255, 0, 0, 255}   

	for y := 0; y < MapHeight; y++ {
		for x := 0; x < MapWidth; x++ {
			intensity := uint8(float64(grid[y][x]) / float64(densityUpperBound) * 255)
			var c color.RGBA

			if intensity < 128 {
				factor := float64(intensity) / 127.0
				c.R = uint8(float64(startColor.R)*(1-factor) + float64(midColor.R)*factor)
				c.G = uint8(float64(startColor.G)*(1-factor) + float64(midColor.G)*factor)
				c.B = uint8(float64(startColor.B)*(1-factor) + float64(midColor.B)*factor)
				c.A = 255
			} else {
				factor := float64(intensity-128) / 127.0
				c.R = uint8(float64(midColor.R)*(1-factor) + float64(endColor.R)*factor)
				c.G = uint8(float64(midColor.G)*(1-factor) + float64(endColor.G)*factor)
				c.B = uint8(float64(midColor.B)*(1-factor) + float64(endColor.B)*factor)
				c.A = 255
			}

			if intensity == 0 {
				c = color.RGBA{211, 211, 211, 255}
			}
			heatMap.Set(x, y, c)
		}
	}

	outputFile, err := os.Create("heatmap.png")
	if err != nil {
		panic(err)
	}
	defer outputFile.Close()

	png.Encode(outputFile, heatMap)
}

func ExportNeighbourDensity(nodes []*Node) [][]int {
	data := make([][]int, len(nodes))
	for i := 0; i < len(nodes); i++ {
		data[i] = make([]int, 3);
		data[i][0] = nodes[i].Properties.ClientX
		data[i][1] = nodes[i].Properties.ClientY
		data[i][2] = len(nodes[i].Neighbours)
	}
	return data
}

func calcAutocorrelation(speed []float64, lag int) float64 {
	n := len(speed)

	numerator := 0.0
	denominator := 0.0 

	for i := 3; i < n - lag; i++ {
		numerator += (speed[i]) * (speed[i + lag])
		denominator += (speed[i]) * (speed[i])
	}

	return numerator / denominator 
}

func calcMean(speed []float64) float64 {
	sum := 0.0
	for _, val := range speed {
		sum += val
	}
	return sum / float64(len(speed))
}

func CalculateGraphDetails(nodes []*Node) GraphStatistics {
	var totalNeighbors int
	var maxVelocityNodeIndex, minVelocityNodeIndex int
	var maxVelocity, minVelocity, averageVelocity, totalVelocity float64
	var maxNeighborsNodeIndex, minNeighborsNodeIndex int
	var maxVelocityValue, minVelocityValue float64
	var maxNeighborsCount, minNeighborsCount int

	var squaredDifferencesSum float64

	totalVelocity = 0.0;
	totalNeighbors = 0;

	speeds := make([]float64, 0)

	for i, node := range nodes {
		speed := node.Velocity.Speed
		totalVelocity += speed
		totalNeighbors += len(node.Neighbours)

		speeds = append(speeds, speed)

		if speed > maxVelocityValue {
			maxVelocityValue = speed
			maxVelocityNodeIndex = i
		}

		if minVelocityNodeIndex == 0 || speed < minVelocityValue {
			minVelocityValue = speed
			minVelocityNodeIndex = i
		}

		if speed > maxVelocity {
			maxVelocity = speed
		}

		if minVelocityNodeIndex == 0 || speed < minVelocity {
			minVelocity = speed
		}

		if len(node.Neighbours) > maxNeighborsCount {
			maxNeighborsCount = len(node.Neighbours)
			maxNeighborsNodeIndex = i
		}

		if minNeighborsNodeIndex == 0 || len(node.Neighbours) < minNeighborsCount {
			minNeighborsCount = len(node.Neighbours)
			minNeighborsNodeIndex = i
		}

		averageVelocity = totalVelocity / float64(len(nodes))

		squaredDifferencesSum += math.Pow(speed-averageVelocity, 2)
	}

	lagUpperBound := int(float64(len(speeds)) * 0.9)

	autoCorrelation := make([]float64, lagUpperBound)

	AverageAutoCorrelation := 0.0

	for lag := 0; lag < lagUpperBound; lag++ {
		autoCorrelation[lag] = calcAutocorrelation(speeds, lag)
		AverageAutoCorrelation += autoCorrelation[lag] 
	}

	AverageAutoCorrelation = AverageAutoCorrelation / float64(lagUpperBound)

	averageNeighbors := float64(totalNeighbors) / float64(len(nodes))
	standardDeviation := math.Sqrt(squaredDifferencesSum / float64(len(nodes)))

	return GraphStatistics{
		TotalNodes:           len(nodes),
		AverageVelocity:      math.Round(averageVelocity*1e5) / 1e5,
		MaxVelocityNodeIndex: maxVelocityNodeIndex,
		MinVelocityNodeIndex: minVelocityNodeIndex,
		MaxVelocity:          math.Round(maxVelocity*1e5) / 1e5,
		MinVelocity:          math.Round(minVelocity*1e5) / 1e5,
		AverageNeighbors:     math.Round(averageNeighbors*1e5) / 1e5,
		MaxNeighborsNodeIndex: maxNeighborsNodeIndex,
		MinNeighborsNodeIndex: minNeighborsNodeIndex,
		StandardDeviation:    math.Round(standardDeviation*1e5) / 1e5,
		AverageAutoCorrelation:    math.Round(AverageAutoCorrelation*1e5) / 1e5,
	}
}