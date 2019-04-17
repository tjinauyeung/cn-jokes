import { useEffect, useRef, useState } from "react";

const DEFAULT_MAX_FAVOURITES = 10;

export function useFavouritesTimer(
  cb,
  delay,
  favCount,
  maxFavs = DEFAULT_MAX_FAVOURITES
) {
  const savedCallback = useRef();
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    savedCallback.current = cb;
  }, [cb]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id;
    let count = favCount;

    if (count <= maxFavs) {
      clearInterval(id);
    }

    if (timerOn) {
      id = setInterval(() => {
        if (count < maxFavs) {
          tick();
          count++;
        } else {
          clearInterval(id);
        }
      }, delay);
    }

    return () => clearInterval(id);
  }, [timerOn]);

  return [timerOn, setTimerOn];
}
