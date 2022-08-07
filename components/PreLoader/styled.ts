import styled from 'styled-components'
import { GlobalThemeProps } from '../../styled/globalStyles'

export const PreLoaderScreen = styled.div`
  position: relative;
  margin-top: 18rem;
  height: 200px;
  width: 100%;
  opacity: 0;
  animation: fade 0.4s ease-in forwards;
  background: ${({ theme }: GlobalThemeProps) => theme.background.primary};

  @keyframes fade {
    0% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
`

export const Balls = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .ball {
    height: 1rem;
    width: 1rem;
    border-radius: 30%;
    /* background: #1b5299; */
    background: ${({ theme }: GlobalThemeProps) => theme.tag.postTagColor};
    margin: 0 6px 0 0;
    animation: oscillate 0.7s ease-in forwards infinite;
  }

  .one {
    animation-delay: 0.5s;
  }
  .two {
    animation-delay: 1s;
  }
  .three {
    animation-delay: 2s;
  }

  @keyframes oscillate {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(20px) rotate(180deg);
    }
    100% {
      transform: translateY(0) rotate(360deg);
    }
  }
`
