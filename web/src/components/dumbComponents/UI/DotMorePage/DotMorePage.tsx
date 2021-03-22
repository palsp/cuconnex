import React from "react";

interface Props {
  amount: number;
}
const DotMorePage: React.FC<Props> = (props) => {
  let dotMorePage = null;
  switch (props.amount) {
    case 1:
      dotMorePage = (
        <svg
          data-test="dot-prop-amount-1"
          xmlns="http://www.w3.org/2000/svg"
          width="71"
          height="71"
        >
          <path
            d="M 32.542 35.5 C 32.542 33.866 33.866 32.542 35.5 32.542 C 37.134 32.542 38.458 33.866 38.458 35.5 C 38.458 37.134 37.134 38.458 35.5 38.458 C 33.866 38.458 32.542 37.134 32.542 35.5 Z"
            fill="transparent"
            stroke-width="5.92"
            stroke="rgb(224, 224, 224)"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M 53.25 35.5 C 53.25 33.866 54.574 32.542 56.208 32.542 C 57.842 32.542 59.167 33.866 59.167 35.5 C 59.167 37.134 57.842 38.458 56.208 38.458 C 54.574 38.458 53.25 37.134 53.25 35.5 Z"
            fill="transparent"
            stroke-width="5.92"
            stroke="rgb(224, 224, 224)"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M 11.833 35.5 C 11.833 33.866 13.158 32.542 14.792 32.542 C 16.426 32.542 17.75 33.866 17.75 35.5 C 17.75 37.134 16.426 38.458 14.792 38.458 C 13.158 38.458 11.833 37.134 11.833 35.5 Z"
            fill="transparent"
            stroke-width="5.92"
            stroke="rgb(243, 49, 130)"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      );
      break;
    case 2:
      dotMorePage = (
        <svg
          data-test="dot-prop-amount-2"
          xmlns="http://www.w3.org/2000/svg"
          width="71"
          height="71"
        >
          <path
            d="M 32.542 35.5 C 32.542 33.866 33.866 32.542 35.5 32.542 C 37.134 32.542 38.458 33.866 38.458 35.5 C 38.458 37.134 37.134 38.458 35.5 38.458 C 33.866 38.458 32.542 37.134 32.542 35.5 Z"
            fill="rgb(243, 49, 130)"
            // stroke-width="5.92"
            stroke="rgb(243, 49, 130)"
            // stroke-linecap="round"
            // stroke-linejoin="round"
          ></path>
          <path
            d="M 53.25 35.5 C 53.25 33.866 54.574 32.542 56.208 32.542 C 57.842 32.542 59.167 33.866 59.167 35.5 C 59.167 37.134 57.842 38.458 56.208 38.458 C 54.574 38.458 53.25 37.134 53.25 35.5 Z"
            fill="hsl(0, 0%, 98%)"
            // stroke-width="5.92"
            stroke="rgb(224, 224, 224)"
            // stroke-linecap="round"
            // stroke-linejoin="round"
          ></path>
          <path
            d="M 11.833 35.5 C 11.833 33.866 13.158 32.542 14.792 32.542 C 16.426 32.542 17.75 33.866 17.75 35.5 C 17.75 37.134 16.426 38.458 14.792 38.458 C 13.158 38.458 11.833 37.134 11.833 35.5 Z"
            fill="transparent"
            // stroke-width="5.92"
            stroke="rgb(243, 49, 130)"
            // stroke-linecap="round"
            // stroke-linejoin="round"
          ></path>
        </svg>
      );
      break;
    case 3:
      dotMorePage = (
        <svg
          data-test="dot-prop-amount-3"
          xmlns="http://www.w3.org/2000/svg"
          width="71"
          height="71"
        >
          <path
            d="M 32.542 35.5 C 32.542 33.866 33.866 32.542 35.5 32.542 C 37.134 32.542 38.458 33.866 38.458 35.5 C 38.458 37.134 37.134 38.458 35.5 38.458 C 33.866 38.458 32.542 37.134 32.542 35.5 Z"
            fill="rgb(243, 49, 130)"
            // stroke-width="5.92"
            stroke="rgb(243, 49, 130)"
            // stroke-linecap="round"
            // stroke-linejoin="round"
          ></path>
          <path
            d="M 53.25 35.5 C 53.25 33.866 54.574 32.542 56.208 32.542 C 57.842 32.542 59.167 33.866 59.167 35.5 C 59.167 37.134 57.842 38.458 56.208 38.458 C 54.574 38.458 53.25 37.134 53.25 35.5 Z"
            fill="transparent"
            // stroke-width="5.92"
            stroke="rgb(243, 49, 130)"
            // stroke-linecap="round"
            // stroke-linejoin="round"
          ></path>
          <path
            d="M 11.833 35.5 C 11.833 33.866 13.158 32.542 14.792 32.542 C 16.426 32.542 17.75 33.866 17.75 35.5 C 17.75 37.134 16.426 38.458 14.792 38.458 C 13.158 38.458 11.833 37.134 11.833 35.5 Z"
            fill="transparent"
            // stroke-width="5.92"
            stroke="rgb(243, 49, 130)"
            // stroke-linecap="round"
            // stroke-linejoin="round"
          ></path>
        </svg>
      );
      break;
    default:
      break;
  }
  return <>{dotMorePage}</>;
};

export default DotMorePage;
