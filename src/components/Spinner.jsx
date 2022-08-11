import { Oval } from "react-loader-spinner";

export const Spinner = () => {
  return (
    <Oval
      height="150"
      width="150"
      color="green"
      ariaLabel="loading"
      wrapperStyle={{ justifyContent: "center" }}
    />
  );
};
