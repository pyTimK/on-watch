import BackIcon from "@/components/svg/icon/BackIcon";
import MyButton from "@/components/templates/MyButton";
import MyInput from "@/components/templates/MyInput";
import useMyInput from "@/hooks/useMyInput";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Modal from "react-modal";

const SettingsPageContext = createContext({});

interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = ({}) => {
  return (
    <SettingsPageContext.Provider value={{}}>
      {/* //TODO: <Header>
        <BackIcon onClick={backHandler} />
      </Header> */}
      {/* //! PROFILE */}
      <SettingsBlock title="Profile">
        {/* <SettingsRow
            title="Male Minimum (Hz)"
            useMyInput={maleMinFreqInput}
          />
          <SettingsRow
            title="Male Maximum (Hz)"
            useMyInput={maleMaxFreqInput}
          />
          <SettingsRow
            title="Female Minimum (Hz)"
            useMyInput={femaleMinFreqInput}
          />
          <SettingsRow
            title="Female Maximum (Hz)"
            useMyInput={femaleMaxFreqInput}
          /> */}
        {/* //TODO: SettingsRowButton */}
      </SettingsBlock>

      {/* //! SETTINGS */}
      <SettingsBlock title="Settings">
        {/* <SettingsRow title="Longitude" useMyInput={longitudeInput} />
          <SettingsRow title="Latitude" useMyInput={latitudeInput} />
          <SettingsRow title="Radius (m)" useMyInput={radiusInput} /> */}
      </SettingsBlock>

      {/* //TODO: Create Modal Template */}
      {/* <Modal
        isOpen={modalIsOpen}
        className="absolute inset-0 w-11/12 -translate-x-1/2 -translate-y-1/2 h-fit top-1/2 left-1/2"
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative m-auto h-44 w-80">
          <div className="absolute w-full h-full border-2 border-white rounded-xl "></div>
          <div className="absolute w-full h-full rotate-[-3deg] bg-white px-5 py-5 rounded-xl ">
            <p className="text-2xl font-bold text-center text-smooth_black">
              Discard Changes?
            </p>
            <div className="flex gap-5 mt-16">
              <MyButton
                label="Cancel"
                className="bg-white border border-black "
                classNameText="text-black"
                onClick={closeModal}
              />
              <MyButton
                label="Discard"
                className="bg-red"
                onClick={() => {
                  closeModal();
                  exitPage();
                }}
              />
            </div>
          </div>
        </div>
      </Modal> */}
    </SettingsPageContext.Provider>
  );
};

interface SettingsBlockProps {
  title: string;
  children: React.ReactNode;
}

const SettingsBlock: React.FC<SettingsBlockProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col gap-5 pb-10">
      <p className="text-2xl font-semibold">{title}</p>
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
};

interface SettingsRowProps {
  title: string;
  useMyInput: ReturnType<typeof useMyInput>;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ title, useMyInput }) => {
  const { ref, error, setError, defaultValue } = useMyInput;

  return (
    <div className="w-48">
      <p className="text-sm">{title}</p>
      <MyInput
        type="number"
        error={error}
        innerRef={ref}
        defaultValue={defaultValue}
        onChange={() => {
          setError(false);
        }}
      />
    </div>
  );
};

export default SettingsPage;
