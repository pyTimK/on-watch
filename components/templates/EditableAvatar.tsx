import AvatarGirl from "../svg/icon/AvatarGirl";
import EditRoundedIcon from "../svg/icon/EditRoundedIcon";
import Avatar from "./Avatar";

interface EditableAvatarProps {
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const EditableAvatar: React.FC<EditableAvatarProps> = ({
  selectedImage,
  setSelectedImage,
}) => {
  return (
    <div className="">
      <div className="w-min m-auto relative">
        <Avatar
          src={selectedImage ? URL.createObjectURL(selectedImage) : undefined}
        />
        <div className="absolute bottom-0 right-0">
          <label htmlFor="avatar-file-input" className="ml-4">
            <EditRoundedIcon />
          </label>
        </div>
      </div>
      <input
        id="avatar-file-input"
        style={{ visibility: "hidden", height: 0, width: 0 }}
        type="file"
        name="avatarImage"
        onChange={(event) => {
          if (!event.target.files) return;
          if (event.target.files.length === 0) return;
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default EditableAvatar;
