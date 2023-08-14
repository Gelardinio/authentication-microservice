# Authentication Microservice 

An authentication microservice built on a Go and Python backend. Collects user browser data, mouse movement and keyboard movement to create an overall profile. Stores mouse movement in a graph data structure and performs analysis including autocorrelation, standard deviation, and velocity analysis to determine if operations on the page are being performed by a bot via selenium and visualizes data for human moderator to verify through a dashboard.

## Purpose

This microservice was created to allow both automatic and manual filtering of website botting. Selenium is sometimes used to imitate human behaviour to exploit websites. This microservice primarily uses mouse movement to differentiate human and command-based cursor movement as well as provide an admin dashboard for verification of such occurences.

## Usage

```
npm i
npm start
go run main.go
```

## Implementation

The `MakeGraph` function takes a slice of type `CursorPosition` and returns a slice of pointers to `Node`. This function creates a graph where each node represents a cursor position with time and position properties as well as velocity vectors. Nodes are connected as neighbors if their distance is within a threshold value set to 50 pixels.

The `CalculateGraphDetails` function calculates various statistics about the given graph. These statistics include the total number of nodes, average and extreme velocity values, average number of neighbors, standard deviation, and more.

A heatmap is also generated from the nodes.
