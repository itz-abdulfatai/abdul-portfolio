import axios from "axios"

function ImageUpload() {
    

  async function uploadImg (e) {
    const img = e.target.files[0]

    if (!img) return

    const data = new FormData()

    data.append('file', img)
    data.append('upload_preset', 'portfolio_site')
    data.append('cloud_name', 'duw6i6yjn')

   try {
     const response = await axios.post('https://api.cloudinary.com/v1_1/duw6i6yjn/image/upload', data, {
       headers: {
         "Content-Type": "multipart/form-data",
 
       }
     })
     alert( response.data.url)

    //  console.log(response.data.url)
     console.log(response.data)
   } catch (error) {
    console.error(error)
    
   }
  }
  return (
    <input type="file" className="test-b" onChange={uploadImg}/>

  )
}

export default ImageUpload


{/* <div className="flex justify-center bg-highlight py-10 text-primary">

<ImageUpload/>
</div> */}