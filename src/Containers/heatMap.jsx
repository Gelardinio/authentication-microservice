import React, { useRef, useEffect, useState } from 'react';
import simpleheat from 'simpleheat';
import { useLocation } from 'react-router-dom';
import styles from './styles';

const HeatMap = () => {
  const containerStyle = {
    maxWidth: '730px',
    maxHeight: '600px',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    overflow: 'hidden',
    top: '100px',
  };

  const canvasRef = useRef(null);

  const location = useLocation();
  const data = location.state && location.state.data;

  let topVal = 0;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] > topVal) {
        topVal = data[i][j];
      }
    }
  }

  const [radius, setRadius] = useState(25);
  const [blur, setBlur] = useState(15);

  useEffect(() => {
    const heat = simpleheat(canvasRef.current);

    heat.data(data).max(topVal).radius(radius, blur).gradient({
      0.4: 'blue',
      0.6: 'cyan',
      0.7: 'lime',
      0.8: 'yellow',
      1.0: 'red',
    });

    heat.draw();

    heat.resize();
  }, [radius, blur]);

  const handleRadiusChange = (e) => {
    setRadius(parseInt(e.target.value, 10));
  };

  const handleBlurChange = (e) => {
    setBlur(parseInt(e.target.value, 10));
  };

  return (
    <div style={containerStyle}>
      <canvas ref={canvasRef} width={1440} height={900} />
    </div>
  );
};

export default HeatMap;
