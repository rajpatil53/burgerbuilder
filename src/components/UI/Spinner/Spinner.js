import React from 'react';
import classes from './Spinner.module.css'

const spinner = () => (
    <div className={classes["sk-fading-circle"]}>
        <div className={[classes["sk-circle1"],classes["sk-circle"]].join(" ")}></div>
        <div className={[classes["sk-circle2"],classes["sk-circle"]].join(" ")}></div>
        <div className={[classes["sk-circle3"],classes["sk-circle"]].join(" ")}></div>
        <div className={[classes["sk-circle4"],classes["sk-circle"]].join(" ")}></div>
        <div className={[classes["sk-circle5"],classes["sk-circle"]].join(" ")}></div>
        <div className={[classes["sk-circle6"],classes["sk-circle"]].join(" ")}></div>
        <div className={[classes["sk-circle7"],classes["sk-circle"]].join(" ")}></div>
        <div className={[classes["sk-circle8"],classes["sk-circle"]].join(" ")}></div>
        <div className={[classes["sk-circle9"],classes["sk-circle"]].join(" ")}></div>
        <div className={[classes["sk-circle10"],classes["sk-circle"]].join(" ")}></div>
        <div className={[classes["sk-circle11"],classes["sk-circle"]].join(" ")}></div>
        <div className={[classes["sk-circle12"],classes["sk-circle"]].join(" ")}></div>
    </div>
);

export default spinner;