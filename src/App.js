import { useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState({});
  const [show, setShow] = useState(false);

  const initialState = useMemo(() => {
    const student = {};
    const data = {};
    Array.from(Array(10)).forEach((_, i) => {
      student[`mahasiswa_${i + 1}`] = 0;
    });
    Array.from(Array(4)).forEach((_, i) => {
      data[`aspek_penilaian_${i + 1}`] = student;
    });
    return data;
  }, []);

  useEffect(() => {
    setState(initialState);
  }, [initialState]);
  
  const min = 0;
  const max = 10;

  const handleSubmit = () => {
    console.log(state);
    setShow(true);
  };

  return (
    <div className="App">
      <div className="wrap-header">
        {Array.from(Array(4)).map((_, i) => (
          <div className="text-grade">Aspek penilain {i + 1}</div>
        ))}
      </div>
      {Array.from(Array(10)).map((_, i) => (
        <div className="wrap">
          <div>Mahasiswa {i + 1}</div>
          {Array.from(Array(4)).map((_, grade) => (
            <input
              type="number"
              min={0}
              max={10}
              value={
                state?.[`aspek_penilaian_${grade + 1}`]?.[`mahasiswa_${i + 1}`]
              }
              onChange={(e) => {
                const value = Math.max(
                  min,
                  Math.min(max, Number(e.target.value))
                );
                setState((prev) => ({
                  ...prev,
                  [`aspek_penilaian_${grade + 1}`]: {
                    ...prev[`aspek_penilaian_${grade + 1}`],
                    [`mahasiswa_${i + 1}`]: value,
                  },
                }));
              }}
            />
          ))}
        </div>
      ))}
      <div className="wrap-button">
        <button onClick={handleSubmit}>Simpan</button>
      </div>
      {show && (
        <div className="code">
          <code>
            <pre>{JSON.stringify(state, null, 2)}</pre>
          </code>
        </div>
      )}
    </div>
  );
}

export default App;
