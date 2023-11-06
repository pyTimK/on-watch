import { useContext } from "react";
import { PagesWrapperContext } from "./PagesWrapper";
import { User } from "firebase/auth";

interface RegisterPageProps {
  user: User;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ user }) => {
  return (
    <div>
      <div>RegisterPage</div>
    </div>
  );
};

export default RegisterPage;
