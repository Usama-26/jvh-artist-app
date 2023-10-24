import { useState, useEffect, useRef } from "react";
import AppLayout from "@/layouts/AppLayout";
import { withAuth } from "@/components/Helpers/withAuth";
import { updateUser } from "@/redux/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser } from "@/redux/auth/auth.actions";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const PaymentSettings = (props) => {
  const router = useRouter();
  const userData = props.userData;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [countryFlag, setCountryFlag] = useState("");
  const [countries, setCountries] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.userbyID);
  const [isPasswordVisibleConfirm, setIsPasswordVisibleConfirm] =
    useState(false);
  const [photo, setPhoto] = useState(user?.photoUrl);

  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: user?.firstName,
    surName: user?.surName,
    email: user?.email,
    phoneNo: user?.phoneNo,
    photoUrl: user?.photoUrl,
    country: user?.country,
  });
  const handleData = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleUpload(file);
  };
  function handleUpload(d) {
    const file = d;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mrrobotdev"); // replace with your upload preset

    axios
      .post("https://api.cloudinary.com/v1_1/mrrobotdev/image/upload", formData)
      .then((response) => {
        // updateUrl(response.data.secure_url);
        handleSubmit(false, response.data.secure_url);
        // handle the successful upload, e.g. store the URL in state
      })
      .catch((error) => {
        // console.error("Upload error:", error);
        toast.error("Image upload error, try again!!!", {});
      });
  }

  const handleLoading = () => {
    setLoading(false);
    dispatch(getUser(userData.id));
  };

  const handleSubmit = (e, customUrl) => {
    e && e.preventDefault();
    const payload = {
      firstName: data.firstName,
      surName: data.surName,
      phoneNo: data.phoneNo,
      photoUrl: customUrl,
      country: data.country,
    };
    const id = userData.id;
    dispatch(updateUser(payload, id, handleLoading));
  };

  const getCountries = async () => {
    const countriesList = await axios.get("https://restcountries.com/v3.1/all");
    setCountries(countriesList);
  };
  useEffect(() => {
    getCountries();
  }, []);
  console.log(countryFlag);

  useEffect(() => {
    if (user) {
      const result = countries?.data?.forEach((country) => {
        if (country.name.common == user.country) {
          setCountryFlag(country.flags.png);
        }
      });
    }
  }, [user, countries]);
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto text-white p-4">
        <div className="bg-[#2D2D2D] rounded-lg p-8">
          <PaymentForm />
          <div className="flex justify-center mt-10 gap-4">
            <button
              onClick={router.back}
              className="py-2 px-8 font-medium rounded bg-[#687182]"
            >
              Back
            </button>
            <button className="py-2 px-8 font-medium rounded btn-gradient">
              Update & Save
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
export default PaymentSettings;

function PaymentForm() {
  return (
    <form className="space-y-4">
      <h2 className="text-lg font-semibold">Bank Details:</h2>
      <div className="flex md:flex-row flex-wrap flex-col gap-4 justify-between ">
        <div className="md:basis-5/12">
          <label className="text-xs text-gray-400 block">Account Number</label>
          <input type="password" className="form-input" value={"Predrag"} />
        </div>
        <div className="md:basis-5/12">
          <label className="text-xs text-gray-400 block">Account Name</label>
          <input type="text" className="form-input" value="Test" />
        </div>
        <div className="md:basis-5/12">
          <label className="text-xs text-gray-400 block">Branch Number</label>
          <input type="text" className="form-input" value="45678" />
        </div>
        <div className="md:basis-5/12">
          <label className="text-xs text-gray-400 block">Account Type</label>
          <input type="text" className="form-input" value="Cheque" />
        </div>
      </div>
    </form>
  );
}
