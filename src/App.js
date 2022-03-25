import './App.css';
import dividerPatternMobile from './images/pattern-divider-mobile.svg';
import dividerPatternDesktop from './images/pattern-divider-desktop.svg';
import dice from './images/icon-dice.svg';
import { useState } from 'react';

function App() {
  const [id, setId] = useState('117');
  const [advice, setAdvice] = useState("It is easy to sit up and take notice, what's difficult is getting up and taking action.")

  const getAdvice = async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      if (response.ok) {
        const jsonResponse = await response.json();
        setId(jsonResponse.slip.id);
        setAdvice(jsonResponse.slip.advice);
      }
    } catch(error) {
      console.log(error);
      setId('N/A');
      setAdvice("I'm on strike leave me alone! (The request for new advice failed, please tell Arthur.)");
    }
  }

  return (
    <article>
        <h1>Advice #{id}</h1>
        <q>{advice}</q>
        <div className='small-mobile-line'></div>
        <picture>
          <source media='(min-width: 580px)' srcSet={dividerPatternDesktop}/>
          <source media='(min-width: 0px)' srcSet={dividerPatternMobile}/>
          <img src={dividerPatternMobile} alt='' aria-hidden='true'/>
        </picture>
        <button onClick={getAdvice}><img src={dice} alt='A dice buton. Press to reveal new advice.'/></button>
    </article>
  );
}

export default App;
