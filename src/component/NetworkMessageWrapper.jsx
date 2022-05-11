import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const NetworkMessageWrapper = ({ children }) => {
  const networkSelector = useSelector((state) => state.network);

  const toast = useToast();

  useEffect(() => {
    if (networkSelector.errorMessage) {
      toast({
        position: "top",
        title: networkSelector.errorTitle,
        description: networkSelector.errorMessage,
        duration: 2000,
      });
    }
  }, [networkSelector.errorMessage]);

  return children;
};

export default NetworkMessageWrapper;
