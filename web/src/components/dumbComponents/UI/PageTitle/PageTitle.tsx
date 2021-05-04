import React from "react";
import { ArrowLeft } from "@icons/index";
import classes from "./PageTitle.module.css";
import { Heading } from "@dumbComponents/UI";

interface Props {
  goBack: (() => void) | false;
  text: string;
  size: string;
}

const PageTitle: React.FC<Props> = (props) => {
  const { goBack, size, text } = props;
  const goBackHandler = goBack === false ? () => null : goBack;
  return (
    <div className={classes.pageTitleContainer}>
      <div onClick={goBackHandler} className={classes.backArrow}>
        <ArrowLeft data-test="team-detail-page-arrow-left" />
      </div>
      <Heading value={text} size={size} />
    </div>
  );
};

export default PageTitle;
