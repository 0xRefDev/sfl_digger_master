import { useNavigate } from "react-router-dom";

export function GoBack() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  
  return (
    <>
      <img
        src="https://img.icons8.com/?size=100&id=26191&format=png&color=FFFFFF"
        alt="Search Icon"
        className="absolute size-8 top-3 -left-14 cursor-pointer"
        onClick={() => {
          goBack();
        }}
      />
    </>
  );
}
