
import * as S from "./styled";

type ThemeTogglerProps = {
  themeToggler: () => void;
};

function TogglerButton({ themeToggler }: ThemeTogglerProps) {

  const isServer = (typeof window === 'undefined')

  return (
      <S.Container>
        <label htmlFor="checkbox" className="switch">
          <input
            id="checkbox"
            type="checkbox"
            onClick={themeToggler}
            onChange={() => false}
            checked={!isServer && window.localStorage.getItem("theme") === "light"}
          />
          <S.Icons className="slider round">
            {!isServer && window.localStorage.getItem("theme") !== "light" ? (
              <div className="icon">
                🌙
              </div>
            ) : (
              <div className="icon">
                🌤️
              </div>
            )}
          </S.Icons>
        </label>
      </S.Container>
  );
}

export default TogglerButton;