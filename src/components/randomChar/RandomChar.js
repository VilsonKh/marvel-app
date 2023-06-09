import { Component } from "react";
import MarvelService from "../../services/MarvelSecvice";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./randomChar.scss";

import mjolnir from "../../resources/img/mjolnir.png";
import Spinner from "../spinner/Spinner";

class RandomChar extends Component {
	constructor(props) {
		super(props);
	
        console.log('constructor')
	}

	state = {
		char: {},
		loading: true,
        error: false
	};

	MarvelService = new MarvelService();

    componentDidMount(){
        console.log("mount")
        this.updateChar()
    }

	onCharLoaded = (char) => {
        console.log('update')
		this.setState({ char: char , loading: false});
	};

    onCharLoading = (char) => {
        this.setState({loading: true})
    }

	updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
		this.MarvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
	};

    onError = () => {
         this.setState({
            loading: false,
            error: true
         })
    }

	render() {
		const {
			char,
			loading,
            error
		} = this.state;

        const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
        const spinner = loading ? <Spinner></Spinner> : null;
        const content = !(loading || error) ? <View char={char}></View> : null;

		return (
			<div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!
						<br />
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">Or choose another one</p>
					<button onClick={this.updateChar} className="button button__main">
						<div className="inner">try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
				</div>
			</div>
		);
	}
}

const View = ({ char }) => {

    const {name, description,thumbnail, homepage,wiki} = char

	return (
		<div className="randomchar__block">
			<img src={thumbnail} alt="Random character" className="randomchar__img" />
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">{description}</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default RandomChar;
