import React from "react";
import ReactDOM from "react-dom";
import { beeApp as BeeApp } from "../../apps/bee-game/bee-cont";

const data = [
    {
        "Queen": { 
            "Lifespan": 100,
            "HitPoints": 8,
            "InitCount": 1
        },
        "Worker": {
            "Lifespan": 75,
            "HitPoints": 10,
            "InitCount": 5
        },
        "Drone": {
            "Lifespan": 50,
            "HitPoints": 12,
            "InitCount": 8
        }
    }
];


export class AppContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    formatDataItems(arr) {
        let index = 0,
            beeItems = [];
        for (var key in arr) {
            if (arr.hasOwnProperty(key)) {
                let type = key,
                    obj = arr[key];

                for (var e = 1; e <= obj.InitCount; e++) {
                    beeItems.push(
                        {
                            "key": (index + "_" + e),
                            "type": type,
                            "lifespan": obj.Lifespan,
                            "hitpoints": obj.HitPoints,
                            "initcount": obj.InitCount
                        }
                    )
                }
            }
            index++;
        }
        return beeItems;
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <BeeApp 
                        settings={this.formatDataItems(this.props.settings)} 
                        initSettings={this.formatDataItems(this.props.settings)}
                    />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<AppContainer settings={data[0]} />, document.getElementById("app"));