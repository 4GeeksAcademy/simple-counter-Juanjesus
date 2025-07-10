import React from "react";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			internalCounter: props.counter,
			isRunning: true,
			hasControl: false // si el usuario tocó algún botón
		};
		this.interval = null;
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			this.setState(prev => {
				if (prev.isRunning) {
					return { internalCounter: prev.internalCounter + 1 };
				}
				return null;
			});
		}, 1000);
	}

	componentDidUpdate(prevProps) {
		// Solo sincronizar con el prop mientras el usuario no haya tocado ningún botón
		if (!this.state.hasControl && prevProps.counter !== this.props.counter) {
			this.setState({ internalCounter: this.props.counter });
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	handlePause = () => {
		this.setState({ isRunning: false, hasControl: true });
	};

	handleResume = () => {
		this.setState({ isRunning: true, hasControl: true });
	};

	handleReset = () => {
		this.setState({ internalCounter: 0, isRunning: false, hasControl: true });
	};

	render() {
		const { internalCounter, isRunning } = this.state;
		const totalDigits = 6;
		const digits = [];
		let number = internalCounter;

		for (let i = 0; i < totalDigits; i++) {
			digits.unshift(number % 10);
			number = Math.floor(number / 10);
		}

		return (
			<div className="text-center">
				<div className="container d-flex justify-content-center gap-3 mt-5 py-3">
					<div className="reloj">
						<i className="fa-regular fa-clock" style={{ color: "#ffffff" }}></i>
					</div>
					{digits.map((digit, index) => (
						<div className="casilla" key={index}>
							{digit}
						</div>
					))}
				</div>

				<div className="mt-3">
					{isRunning ? (
						<button className="btn btn-dark mx-2" onClick={this.handlePause}>
							<span className="gap-2"><i className="fas fa-pause"></i> Pausar</span>
						</button>
					) : (
						<button className="btn btn-dark mx-2" onClick={this.handleResume}>
							<span className="gap-2"><i className="fas fa-play"></i> Reanudar</span>
						</button>
					)}
					<button className="btn btn-dark mx-2" onClick={this.handleReset}>
						<span className="gap-2"><i className="fa-solid fa-rotate-right"></i> Reiniciar</span>
					</button>
				</div>
			</div>
		);
	}
}

export default Home;
