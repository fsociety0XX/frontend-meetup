import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import akash from "./assets/akash.jpg";
import akshay from "./assets/akshay.jpg";
import devanshi from "./assets/devanshi.jpg";
import gopal from "./assets/gopal.jpg";
import kush from "./assets/kush.jpg";
import meet from "./assets/meet.jpg";
import priyanka from "./assets/priyanka.jpg";
import sadik from "./assets/sadik1.png";
import yamin from "./assets/yamin1.png";
import mehak from "./assets/mehak.jpeg";

export const userId = [
  "hqom5EYUwJS9uqW0RY1vU87ao0P2",
  "Q1MeoKVS5kUEGvTAv4r0ThKvUMz1",
  "yTNbqeNz8SYgWwPKqOf5j0seJRL2",
  "SxfpRSQCKpQW9gfCqKuj3K0SiVg1",
  "uUwumYxYqCbdBgX6oyrscLBC6s03",
  "42IS0jPilbOsBjAwJbZIwqd7ZfK2",
  "Ki92lA9RUpeFPrKRBOkBaIwdecD2",
  "BFjsUYsWnZhJLo8gebxAlSxc5MH2",
  "DGEtxYmguqfDBN48wuOosmli7XF3",
  "eaWE858M9RdxwNk9Tk91mwYJDh52",
];

//Tostify
export const notify = (message, type) => {
  switch (type) {
    case "error":
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: false,
      });
      break;
    case "success":
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: false,
      });
      break;
    default:
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: false,
      });
  }

  //close alert box after 5 second.
  setTimeout(function () {
    toast.dismiss();
  }, 5000);
};

// usernames and images

export const userList = [
  {
    name: "Akshay Soni",
    image: akshay,
    email: "akshay@visibly.io",
  },
  {
    name: "Akash Sharma",
    image: akash,
    email: "akash.sharma@o2h.com",
  },
  {
    name: "Devanshi Shah",
    image: devanshi,
    email: "devanshi@o2h.com",
  },
  {
    name: "Gopal Krishna",
    image: gopal,
    email: "gopalkrishna@o2h.com",
  },
  {
    name: "Kushagra Garg",
    image: kush,
    email: "kushagra@o2h.com",
  },
  {
    name: "Meet Radhanpura",
    image: meet,
    email: "meet@o2h.com",
  },
  {
    name: "Mehak Khanna",
    image: mehak,
    email: "mehak@o2h.com",
  },
  {
    name: "Priyanka Patel",
    image: priyanka,
    email: "priyanka.patel@o2h.com",
  },
  {
    name: "Sadikali Dantreleeya",
    image: sadik,
    email: "sadikali@o2h.com",
  },
  {
    name: "Yamin Lawar",
    image: yamin,
    email: "yamin@ourphilosophy.co.uk",
  },
];
