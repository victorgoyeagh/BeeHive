import React from "react";
import ReactDOM from "react-dom";
import HelperFunctions from "./HelperFunctions";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export class BeeApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.settings,
            beeRandomlyHit: null
        }

        this.initialData = this.props.initSettings;
    }
    componentDidMount() {
        this.state = {
            data: this.props.settings,
            beeRandomlyHit: null
        }
    }
    componentWillUnmount() {
        this.setState({
            data: [],
            beeRandomlyHit: null
        });
    }
    resetBeeHive(e) {
        this.setState({
            data: this.initialData,
            beeRandomlyHit: null
        });
        console.debug("Bee hive was reset");
    }
    killOffBees() {
        let currState = this.state.data,
            _self = this;

        for (var i = 0; i < (currState.length); i++) {
            setTimeout(function () {
                currState.splice(currState.indexOf(currState[i]), 1);
                _self.setState({
                    data: currState,
                    beeRandomlyHit: {}
                });
                i--;
            }, 800 * i);
        }
    }
    strikeBee(beeIndex) {
        let currState = this.state.data,
            abusedBee = currState[beeIndex],
            isQueenBee = (abusedBee.type.toLowerCase() == "queen");

        abusedBee.lifespan = (abusedBee.lifespan - abusedBee.hitpoints);

        if (abusedBee.lifespan <= 0) {
            if (isQueenBee) {
                console.log("Queen struck");
                currState.splice(beeIndex, 1);
                this.killOffBees();
            } else {
                currState.splice(beeIndex, 1);
            }

            console.log("The " + abusedBee.type + " Bee at position " + beeIndex + " was struck!!!");

        } else {
            currState[beeIndex] = abusedBee;
        }

        this.setState({
            data: currState,
            beeRandomlyHit: abusedBee.key
        });
    }
    render() {
        return (
            <div className="col-xs-12">
                <h1>Bee Hive</h1>
                <div className="honey-pot"></div>
                <BeeHive
                    beeInfo={this.state.data}
                    beeRandomlyHit={this.state.beeRandomlyHit}
                    />
                <BeeControls
                    resetBeeHive={this.resetBeeHive.bind(this)}
                    strikeBee={this.strikeBee.bind(this)}
                    beeCount={this.state.data.length}
                    />
            </div>
        )
    }
}

class BeeHive extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.beeRandomlyHit = this.props.beeRandomlyHit;
    }
    render() {
        var beeRandomlyHit = this.props.beeRandomlyHit;
        var bees = Array.prototype.map.call(this.props.beeInfo, function (obj, index) {
            return (
                <Bee
                    key={obj.key}
                    position={obj.key}
                    type={obj.type}
                    lifespan={obj.lifespan}
                    hitpoints={obj.hitpoints}
                    initcount={obj.initcount}
                    randomlyhit={beeRandomlyHit}
                    />
            )
        });

        let htmlToRender = "";
        if (this.props.beeInfo.length > 0) {
            htmlToRender = (
                <ul className="list-unstyled list-inline beehive">
                    <ReactCSSTransitionGroup transitionName="beeanim" transitionEnterTimeout={400} transitionLeaveTimeout={400}>
                        {bees}
                    </ReactCSSTransitionGroup>
                </ul>
            );
        } else {
            htmlToRender = (
                <ul className="list-unstyled list-inline beehive">
                    <li className="center"><h4>Yup, you killed the queen or/and all bees were struck to death :(</h4></li>
                </ul>
            );
        }

        return (
            htmlToRender
        )
    }
}

class Bee extends React.Component {
    constructor(props) {
        super(props);
        this.animateBeeClass = this.props.type.toLowerCase();
        this.animatePointsClass = "hitpoints";
    }
    render() {
        return (
            <li className={"bee " + this.props.type + "_" + this.props.position}>
                <div className={(this.props.position == this.props.randomlyhit) ? (this.animateBeeClass + ' animate') : this.animateBeeClass}></div>
                <div className="lifespan">{this.props.lifespan}</div>
                <div className={(this.props.position == this.props.randomlyhit) ? ('hitpoints animate') : 'hitpoints'}>{"-" + this.props.hitpoints}</div>
            </li>
        )
    }
}

class BeeControls extends React.Component {
    constructor(props) {
        super(props);
    }
    handleResetBeeHive(e) {
        e.preventDefault();
        this.props.resetBeeHive();
    }
    handleStrikeBee(e) {
        e.preventDefault();
        let randomBeeIndex = (Math.ceil(this.getRandomBeeIndex()) - 1);
        this.props.strikeBee(randomBeeIndex);
        //console.log("indy", randomBeeIndex);
    }
    getRandomBeeIndex() {
        return ((this.props.beeCount * Math.random()));
    }
    render() {
        return (
            <form className="bee-controls">
                <div className="row">
                    <div className="col-xs-6 text-right">
                        <button className="btn btn-default btn-warning" type="submit" name="submit" value="Hit" onClick={this.handleStrikeBee.bind(this)}>Hit'em</button>
                    </div>
                    <div className="col-xs-6">
                        <button className="btn btn-default btn-info" type="submit" name="submit" value="reset" onClick={this.handleResetBeeHive.bind(this)}>Reset Game</button>
                    </div>
                </div>
            </form>
        )
    }
}

module.exports = {
    beeApp: BeeApp
}