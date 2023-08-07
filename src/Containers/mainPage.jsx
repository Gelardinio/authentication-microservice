import React, {useRef, useEffect} from 'react';
import simpleheat from 'simpleheat';
import { useLocation } from "react-router-dom";

const MainPage = () => {

    const canvasRef = useRef(null);

    const location = useLocation();
    const data = location.state && location.state.data;

    let topVal = 0;

    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].length; j++) {
            if(data[i][j] > topVal) {
                topVal = data[i][j];
            } 
        }
    }

    useEffect(() => {
        const heat = simpleheat(canvasRef.current);

        heat.data(data).max(topVal).radius(25, 15).gradient({
            0.4: 'blue',
            0.6: 'cyan',
            0.7: 'lime',
            0.8: 'yellow',
            1.0: 'red',
        });

        heat.draw();

        heat.resize();

        console.log(data)
    });

    return (
        <div>
        <h1>Sample Page</h1>
        <p>This is a sample page.</p>
        <canvas ref={canvasRef} width={1300} height={800} />
        </div>
    );
};

export default MainPage;
