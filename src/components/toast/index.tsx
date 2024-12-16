import { Center, Text, useToast } from "@chakra-ui/react";

type ToastType = "default" | "error" | "warn";

const toastStyles = {
  default: "blue.500",
  error: "red.500",
  warn: "orange.500",
};

export function useToastLocal() {
  const chakraToast = useToast();

  function toast(
    message: string,
    type: ToastType = "default",
    duration: number = 3000
  ) {
    chakraToast({
      duration,
      render: () => <ToastContainer message={message} type={type} />,
    });
  }

  return { toast };
}

function ToastContainer({
  message,
  type = "default",
}: {
  message: string;
  type?: ToastType;
}) {
  return (
    <Center color="white" p={3} bg={toastStyles[type]} borderRadius={"4px"}>
      <Text mr={"3px"}>{message}</Text>
    </Center>
  );
}
