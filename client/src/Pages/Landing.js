//import Header from "../Components/Header"
import FileUploadForm from "../Components/ImageForm"
export default function Landing() {
  return (
    <div>
      {/* <Header /> */}
      <div Row className=" d-flex justify-content-center pt-5">
        <h1>OrniPedia</h1>
      </div>
      <FileUploadForm />
    </div>
  )
}