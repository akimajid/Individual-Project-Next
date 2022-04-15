import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const NetworkMessageWrapper = ({ children }) => {
  const networkSelector = useSelector((state) => state.network);

  const toast = useToast();

  useEffect(() => {
    if (networkSelector.errorMsg) {
      toast({
        position: "top",
        title: networkSelector.errorTitle,
        description: networkSelector.errorMsg,
        duration: 2000,
      });
    }
  }, [networkSelector.errorMsg]);

  return children;
};

export default NetworkMessageWrapper;
