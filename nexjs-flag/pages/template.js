// nextJS
import Head from 'next/head';
import Image from 'next/image'
// React
import React, {useState, useEffect, useRef} from 'react';
// Dnd Kit
import {
    DndContext,
    closestCenter} from '@dnd-kit/core';
// html2canvas
import html2canvas, {} from 'html2canvas';
// Styles
import styles from '../styles/Home.module.css';
// Components
import {Draggable} from '../components/draggable';
import {Droppable} from '../components/droppable';


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Custom hook to use property localStorage
// Can also use (typeof window !== "undefined") here instead of try blocks and useEffect()
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(key)
      // Check if the local storage already has any values,
      // otherwise initialize it with the passed initialValue
      return value ? JSON.parse(value) : initialValue
    } catch (error) {
      console.log(error)
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default function template() {
    // Data Structures
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const reference = useRef();
    // Get the localStorage value from local storage (if it exists)
    const [value, setValue] = useLocalStorage("Shapes","");
    // Set the value received from the local storage to a local state
    const [localStorageShapes, setLocalStorageShapes] = useState(value)
    const [shapes, setShapes] = useState(() => value == "" || value == null ? 
      [
        {
          id: "Canton",
          image: "Canton.svg",
          position: {
              x: 10,
              y: 10
          }
        },
        {
          id: "Border",
          image: "Border.svg",
          position: {
            x: 10,
            y: 190
          }
        },
        {
          id: "Quad",
          image: "Quad.svg",
          position: {
            x: 10,
            y: 380
          }
        },
        {
          id: "Greek",
          image: "Greek_Cross.svg",
          position: {
              x: 10,
              y: 570
          }
        },
        {
          id: "Symmetric",
          image: "Symmetric_Cross.svg",
          position: {
              x: 10,
              y: 760
          }
        }, 
        {
          id: "Pale",
          image: "Pale.svg",
          position: {
              x: 10,
              y: 950
          }
        },
        {
          id: "Fess",
          image: "Fess.svg",
          position: {
              x: 300,
              y: 10
          }
        },
        {
          id: "Bend",
          image: "Bend.svg",
          position: {
              x: 300,
              y: 190
          }
        },
        {
          id: "Chevron",
          image: "Chevron.svg",
          position: {
              x: 300,
              y: 380
          }
        },
        {
          id: "Pall",
          image: "Pall.svg",
          position: {
              x: 300,
              y: 570
          }
        },
        {
          id: "Saltire",
          image: "Saltire.svg",
          position: {
              x: 300,
              y: 760
          }
        } 
      ] : localStorageShapes)
      
    const handleSubmit = async (e) => {
        const prompt = reference.current;
        html2canvas(prompt).then(async (canvas) => {
          e.preventDefault();
          const image = canvas.toDataURL('image/jpeg', 1.0);
          const response = await fetch("/api/predictions/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: image,
            }),
          });
          let prediction = await response.json();
          if (response.status !== 201) {
            setError(prediction.detail);
            return;
          }
          setPrediction(prediction);
      
          while (
            prediction.status !== "succeeded" &&
            prediction.status !== "failed"
          ) {
            await sleep(1000);
            const response = await fetch("/api/predictions/" + prediction.id);
            prediction = await response.json();
            if (response.status !== 200) {
              setError(prediction.detail);
              return;
            }
            setPrediction(prediction);
          }
          {}})
        
      };

    const resetLocalStorage = e => {
      e.preventDefault();
      window.localStorage.clear();
      setValue(null);
      setPrediction(null);
      setShapes(() => value == "" || value == null ? 
      [
        {
          id: "Canton",
          image: "Canton.svg",
          position: {
              x: 10,
              y: 10
          }
        },
        {
          id: "Border",
          image: "Border.svg",
          position: {
            x: 10,
            y: 190
          }
        },
        {
          id: "Quad",
          image: "Quad.svg",
          position: {
            x: 10,
            y: 380
          }
        },
        {
          id: "Greek",
          image: "Greek_Cross.svg",
          position: {
              x: 10,
              y: 570
          }
        },
        {
          id: "Symmetric",
          image: "Symmetric_Cross.svg",
          position: {
              x: 10,
              y: 760
          }
        }, 
        {
          id: "Pale",
          image: "Pale.svg",
          position: {
              x: 10,
              y: 950
          }
        },
        {
          id: "Fess",
          image: "Fess.svg",
          position: {
              x: 300,
              y: 10
          }
        },
        {
          id: "Bend",
          image: "Bend.svg",
          position: {
              x: 300,
              y: 190
          }
        },
        {
          id: "Chevron",
          image: "Chevron.svg",
          position: {
              x: 300,
              y: 380
          }
        },
        {
          id: "Pall",
          image: "Pall.svg",
          position: {
              x: 300,
              y: 570
          }
        },
        {
          id: "Saltire",
          image: "Saltire.svg",
          position: {
              x: 300,
              y: 760
          }
        } 
      ] : localStorageShapes);
    }

    
    return (
        <div className={styles.container}
        >
            <Head>
                <title>Template</title>
                <link rel="icon" href="/Flag_of_FIAV.svg" />
            </Head>
            <div ref={reference}>
              <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                
                    {shapes.map((shape) => (
                        <Draggable
                            styles={{
                                position: "absolute",
                                left: `${shape.position.x}px`,
                                top: `${shape.position.y}px`
                            }}
                            key={shape.id}
                            id={shape.id}
                            content ={<img src={shape.image} width="300" height="150"></img>}
                        /> 
                    ))}
              <Droppable id='droppable'></Droppable>
              </DndContext>
            </div>
            
            <div className={styles.button}>
              <button type='button' id='save' onClick={() => setValue(shapes)}>Click me to save template!</button>

              <button type='button' id='reset' onClick={resetLocalStorage}>Click me twice to reset template!</button>

              <button type='button' id='render' onClick={handleSubmit}>Click me to upscale your design!</button>
            </div>
            

            {error && <div>{error}</div>}

            {prediction && (
                <div>
                    {prediction.output && (
                    <div className={styles.imageWrapper}>
                        <Image
                            src={prediction.output[prediction.output.length - 1]}
                            alt="output"
                            width={1000}
                            height={500}
                        />
                    </div>
                    )}
                <p>status: {prediction.status}</p>
                </div>
            )}
        </div>
    );
  
    // Function that is called when user drops draggable object
    function handleDragEnd(event) {
      if (event.over && event.over.id === 'droppable') {
        const shape = shapes.find((x) => x.id === event.active.id);
        shape.position.x += event.delta.x;
        shape.position.y += event.delta.y;
        const _shapes = shapes.map((x) => {
            if (x.id === shape.id) return shape;
            return x;
        });
        setShapes(_shapes)
        setLocalStorageShapes(_shapes)
    } }
};
