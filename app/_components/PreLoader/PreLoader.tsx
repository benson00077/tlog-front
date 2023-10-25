import React from 'react'
import * as S from './styled'

function PreLoader() {
  return (
    <>
      <S.PreLoaderScreen>
        <S.Balls>
          <div className="ball one"></div>
          <div className="ball two"></div>
          <div className="ball three"></div>
        </S.Balls>
      </S.PreLoaderScreen>
    </>
  )
}

export default PreLoader
