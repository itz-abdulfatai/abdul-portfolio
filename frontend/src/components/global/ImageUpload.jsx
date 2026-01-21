import { useEffect, useRef, useState } from "react";
import axios from "axios";

function ImageUpload() {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  async function uploadImg(img) {
    const pass = prompt("what is the pass?");
    if (!pass || pass.trim() !== "inside") {
      alert("wrong pass");
      return;
    }

    if (!img) return;

    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "portfolio_site");
    data.append("cloud_name", "duw6i6yjn");

    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/duw6i6yjn/image/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const url = response.data.secure_url.replace(
        "/upload/",
        "/upload/q_auto/"
      );

      console.log("Uploaded URL:", url);

      // add new URL to list
      setUrls(() => [url]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // handle file select
  function handleFileChange(e) {
    const img = e.target.files[0];
    uploadImg(img);
  }

  // handle paste
  useEffect(() => {
    function handlePaste(e) {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const blob = items[i].getAsFile();
            uploadImg(blob);
          }
        }
      }
    }

    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  // handle drag and drop
  function handleDragOver(e) {
    e.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setDragActive(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadImg(e.dataTransfer.files[0]);
    }
  }

  // copy to clipboard when clicked
  async function copyToClipboard(url) {
    try {
      await navigator.clipboard.writeText(url);
      // no alert, just silent copy
    } catch (err) {
      console.error("Clipboard error:", err);
    }
  }

  return (
    <div className="mx-40 my-20">
      {/* Upload Area */}
      <div
        className={`flex flex-col items-center gap-4 p-6 border-2 border-dashed rounded-2xl shadow-md transition-all cursor-pointer
          ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-400 bg-secondary hover:border-blue-400"
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <p className="text-gray-600 text-sm text-center">
          Click, paste (<kbd>Ctrl</kbd>+<kbd>V</kbd>), or drag & drop an image
          to upload.
        </p>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        {loading && (
          <div className="flex items-center gap-2 text-blue-600">
            <svg
              className="animate-spin h-5 w-5 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Uploading...
          </div>
        )}
      </div>

      {/* Uploaded Links */}
      {urls.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Uploaded Links</h2>
          <ol className="space-y-2">
            {urls.map((url, i) => (
              <li
                key={i}
                onClick={() => copyToClipboard(url)}
                className="text-blue-600 underline cursor-pointer hover:text-blue-800"
              >
                {i + 1}. {url}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
