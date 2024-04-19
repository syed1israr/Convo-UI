import moment from "moment";

const fileFormat = (url = "") => {
    const fileExtension = url.split(".").pop().toLowerCase(); // Convert to lower case for case insensitivity
    if (fileExtension === "mp4" || fileExtension === "webm" || fileExtension === "ogg") return "video";
    if (fileExtension === "mp3" || fileExtension === "wav") return "audio"; // Corrected file extension "wave" to "wav"
    if (fileExtension === "png" || fileExtension === "jpeg" || fileExtension === "gif" || fileExtension === "jpg") return "image";
    return "file"; // Corrected returning "file" instead of file
}
{/*
  Hi
*/}
const transoformImage= (url = "",width=100)=>
{
    const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
  
    return newUrl;
};
const getLast7Days=()=>{
    const currentdate=moment();
    const last7Days=[];
    for ( let i=0; i<7;i++){
        last7Days.unshift(currentdate.format("MMM D"));
        currentdate.subtract(1,"days")
    }
    return last7Days;
}
const transformImage = (url = "", width = 100) => {
    
  };

  const getOrSaveFromStorage = ({ key, value, get }) => {
    if (get)
      return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : null;
    else localStorage.setItem(key, JSON.stringify(value));
  };
export { fileFormat ,transoformImage,getLast7Days , getOrSaveFromStorage};
