import React from "react";
import { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import styles from "./timer.module.css"
 
 
export default function App() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState("stop");
 
  useEffect(() => {
    const unsubscribe$ = new Subject();
    interval(1000)
      .pipe(takeUntil(unsubscribe$))
      .subscribe(() => {
        if (status === "run") {
          setSec(val => val + 1000);
        }
      });
    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [status]);
 
  const start = React.useCallback(() => {
    setStatus("run");
  }, []);
 
  const stop = React.useCallback(() => {
    setStatus("stop");
    setSec(0);
  }, []);
 
  const reset = React.useCallback(() => {
    setSec(0);
  }, []);
 
  const wait = React.useCallback(() => {
    setStatus("wait");
  }, 300);
 
  return (
    <div className={styles.timer}>
      <span className={styles.time}> {new Date(sec).toISOString().slice(11, 19)}</span>
      <button className={styles.start} onClick={start}>
        Start
      </button>
      <button className={styles.stop} onClick={stop}>
        Stop
      </button>
      <button onClick={reset}>Reset</button>
      <button onClick={wait}>Wait</button>
    </div>
  );
}
 
