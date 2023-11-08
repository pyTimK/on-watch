import { Constants } from "@/classes/constants";
import notify from "@/myfunctions/notify";
import { useState } from "react";

export const useQr = (closeModal: () => void) => {
  const [qr, setQr] = useState("");
  const [isValidQr, setIsValidQR] = useState(false);
  const [errorQrInput, setErrorQrInput] = useState(false);

  //! QR SCAN
  const onQrScan = (result: string) => {
    setQr(result);
    if (Constants.validDeviceIds.includes(result)) {
      notify("Device verified", { type: "success" });
      closeModal();
      setIsValidQR(true);
      setErrorQrInput(false);
    } else {
      notify("Invalid QR code");
      setIsValidQR(false);
      setErrorQrInput(true);
    }
  };

  const verifyQR = () => {
    if (!isValidQr) {
      notify("Invalid QR code");
      setErrorQrInput(true);
      return false;
    }
    return true;
  };

  return { qr, isValidQr, verifyQR, errorQrInput, onQrScan };
};
