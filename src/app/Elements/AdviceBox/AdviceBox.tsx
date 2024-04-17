import React, { useState } from 'react';
import { Candy } from '../Candys/Candy';
import { CandyContainer } from '../Candys/CandyContainer';
type Props = {
  advices: string[];
  callback: () => void;
}
export const AdviceBox = ({ advices, callback }: Props) => {
  const [currentAdviceIndex, setCurrentAdviceIndex] = useState(0);

  const nextAdvice = () => {
    setCurrentAdviceIndex((prevIndex) => (prevIndex + 1) % advices.length);
  };

  const previousAdvice = () => {
    setCurrentAdviceIndex((prevIndex) => {
      if (prevIndex === 0) return advices.length - 1;
      return prevIndex - 1;
    });
  };

  return (
    <div className='advice-box-container'>
      <div className="advice-box">
        <h1>Information</h1>
        <p>{advices[currentAdviceIndex]}</p>
        <CandyContainer className="buttons">
          <Candy className='CandyContainer' onEnter={previousAdvice} posicion={[1,1]}>
            <button onClick={previousAdvice} disabled={advices.length <= 1}>Previous</button>
          </Candy>
          <Candy className='CandyContainer' onEnter={previousAdvice} posicion={[1,2]}>
            <button onClick={nextAdvice} disabled={advices.length <= 1}>Next</button>
          </Candy>
        </CandyContainer>
        <CandyContainer className="buttons">
          <Candy className='CandyContainer' onEnter={callback} posicion={[2,1]}>
            <button onClick={callback}>Close</button>
          </Candy>
        </CandyContainer>
      </div>
    </div>
  );
};