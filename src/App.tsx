import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrow from './assets/leftarrow.png';
import { useState } from 'react';

import { levels, calculateImc, Level } from './helpers/imc';
import { GridItem } from './components/GridItem';

const App = () => {
	const [height, setHeight] = useState<number>(0);
	const [weight, setWeight] = useState<number>(0);
	const [showItem, setShowItem] = useState<Level | null>(null);

	const handleCalculate = () => {
		if (height && weight) {
            setShowItem(calculateImc(height, weight))
		} else {
			alert('Digite todos os campos!');
		}
	}

	const handleBackButton = () => {
		setShowItem(null);
		setHeight(0);
		setWeight(0);
	}

	return (
		<div className={styles.main}>
			<header>
				<div className={styles.headerContainer}>
					<img src={poweredImage} alt="" width={150}/>
				</div>
			</header>

			<div className={styles.container}>
				<div className={styles.leftSide}>
					<h1>Calcule o seu IMC.</h1>
					<p>
						IMC é a sigla para índice de Massa Corpórea,
						parâmetro adotado pela Organização Mundial de Saúde
						para calcular o peso ideal de cada pessoa.
					</p>

					<input 
						type="number"
						placeholder='Digite a sua altura. Ex: 1.5 (em métros)'
						value={height > 0 ? height : ''}
						onChange={e => setHeight(parseFloat(e.target.value))}
						disabled={showItem ? true : false}
					/>

					<input 
						type="number"
						placeholder='Digite o seu peso. Ex: 55.3 (em kg)'
						value={weight > 0 ? weight : ''}
						onChange={e => setWeight(parseFloat(e.target.value))}
						disabled={showItem ? true : false}
					/>

					<button 
						onClick={handleCalculate}
					 	disabled={showItem ? true : false}>
							Calcular
					</button>
				</div>

				<div className={styles.rightSide}>
					{!showItem &&
						<div className={styles.grid}>
							{	
								levels.map((item, key)=>(
									<GridItem key={key} item={item}/>
								))
							}
						</div>
					}
					{showItem &&
						<div className={styles.levelContainer}>
							<div className={styles.arrow} onClick={handleBackButton}>
								<img src={leftArrow} alt="" width={25}/>
							</div>
							<GridItem item={showItem} />
						</div>
					}

				</div>
			</div>
		</div>
	)
}

export default App;