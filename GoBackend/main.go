package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"GoBackend/GoBackend/graph"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/submit", SubmitData).Methods("POST")

	corsHandler := cors.AllowAll().Handler(router)

	fmt.Println("Server started at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", corsHandler))
}

func SubmitData(w http.ResponseWriter, r *http.Request) {
	var data []graph.CursorPosition
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, "Invalid ", http.StatusBadRequest)
		return
	}

	graphData := graph.MakeGraph(data)
	graph.CreateDensityHeatMap(graphData)
	exportedData := graph.ExportNeighbourDensity(graphData)
	graphDetails := graph.CalculateGraphDetails(graphData)

	response := map[string]interface{}{
		"exportedData": exportedData,
		"graphDetails": graphDetails,
	}

	json.NewEncoder(w).Encode(response)
}
